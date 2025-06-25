import { Formik } from "formik";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  ActivityIndicator,
  Linking,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as yup from "yup";
import {
  useDashboard,
  useDashboardDispatch,
} from "../../context/DashboardContextProvider";
import { getApiUrl, getBaseUrl, getUserRoleId } from "../../utils/helper";
import { styles } from "./styles";
import Checkbox from "expo-checkbox";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from 'react-i18next';

const VerifyUserForm = ({
  navigation,
  isUserExist,
  setIsUserExist,
  mobileNumber,
  setMobileNumber,
}) => {
  const { t } = useTranslation();
  const [errorText, setErrortext] = useState("");
  const [loading, setLoading] = useState(false);
  const API_URL = getApiUrl();
  const BASE_URL = getBaseUrl();
  const [isSignupUser, setIsSignupUser] = useState(false);

  const { patientLoginData } = useDashboard();
  const dashboardDispatch = useDashboardDispatch();

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const validationSchema = yup.object().shape({
    mobile: yup
      .string()
      .matches(phoneRegExp, t('auth.mobileNumber.validation.invalid'))
      .min(10, t('auth.mobileNumber.validation.minLength'))
      .max(10, t('auth.mobileNumber.validation.maxLength'))
      .required(t('auth.mobileNumber.validation.required')),
    termsAndConditions: yup
      .boolean()
      .oneOf([true], t('auth.termsAndConditions.validation'))
      .required(t('auth.termsAndConditions.validation')),
  });

  // Enhanced API call function with better error handling
  const makeAPICall = async (url, postData, stepName) => {
    console.log(`🚀 [${stepName}] Making API call to:`, url);
    console.log(`📤 [${stepName}] Request payload:`, JSON.stringify(postData, null, 2));
    
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(postData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      console.log(`📡 [${stepName}] Response status:`, response.status);
      const data = await response.json();
      console.log(`📥 [${stepName}] Response data:`, JSON.stringify(data, null, 2));
      
      return data;
    } catch (error) {
      console.error(`❌ [${stepName}] API call failed:`, error);
      throw error;
    }
  };

  // Handle fetch_auth_token step
  const handleFetchAuthToken = async (requestId, mobile) => {
    console.log("🔐 Starting fetch_auth_token process...");
    
    try {
      const ROLE_ID = await AsyncStorage.getItem("curr_role_id") || "375";
      const postData = {
        step: "fetch_auth_token",
        request_id: requestId,
        username: "+91" + mobile,
      };

      const data = await makeAPICall(
        `${API_URL}/v2/login/${ROLE_ID}/`,
        postData,
        "fetch_auth_token"
      );

      if (data.success && data.access_token) {
        console.log("✅ Auth token received successfully!");
        console.log("🎫 Access Token:", data.access_token);
        console.log("🔄 Refresh Token:", data.refresh_token);
        console.log("⏰ Expires in:", data.expires_in);
        
        // Store tokens
        await AsyncStorage.setItem("access_token", data.access_token);
        await AsyncStorage.setItem("refresh_token", data.refresh_token);
        
        // Update dashboard state
        dashboardDispatch({
          type: "SET_PATIENT_LOGIN_DATA",
          payload: {
            ...patientLoginData,
            currentStep: "webview", // or "done" based on your flow
            accessToken: data.access_token,
            refreshToken: data.refresh_token,
          },
        });

        // Navigate to webview or next screen
        console.log("🌐 Ready to navigate to webview");
        // navigation.navigate("WebView"); // Uncomment when ready
        
      } else {
        console.log("❌ Failed to get auth token:", data.message);
        setErrortext(data.message || "Failed to authenticate");
      }
    } catch (error) {
      console.error("❌ Error in handleFetchAuthToken:", error);
      setErrortext("Authentication failed. Please try again.");
    }
  };

  // Signup flow
  const handleSignupFlow = async (values) => {
    console.log("📝 Starting SIGNUP flow...");
    
    try {
      // Step 1: signup_username
      let postData = {
        step: "signup_username",
        request_id: patientLoginData.request_id,
        username: "+91" + values.mobile,
      };

      const step1Data = await makeAPICall(
        `${API_URL}/v2/login/403/`,
        postData,
        "signup_username"
      );

      // Step 2: submit_consent
      let consentPostData = {
        step: "submit_consent",
        request_id: patientLoginData.request_id,
        username: "+91" + values.mobile,
        consent_text: "",
      };

      const step2Data = await makeAPICall(
        `${API_URL}/v2/login/403/`,
        consentPostData,
        "submit_consent"
      );

      // Step 3: Handle next step based on response
      if (step2Data.next === "send_signup_otp") {
        console.log("📨 Proceeding to send signup OTP...");
        
        let sendOtpPostdata = {
          step: "send_signup_otp",
          request_id: patientLoginData.request_id,
          username: "+91" + values.mobile,
          consent_text: "",
        };

        const step3Data = await makeAPICall(
          `${API_URL}/v2/login/403/`,
          sendOtpPostdata,
          "send_signup_otp"
        );

        if (step3Data.next === "verify_signup_otp") {
          console.log("✅ OTP sent successfully, moving to verify OTP step");
          dashboardDispatch({
            type: "SET_PATIENT_LOGIN_DATA",
            payload: {
              ...patientLoginData,
              currentStep: "verify_otp",
              isSignup: true,
            },
          });
        }
      }
       else if (step2Data.next === "fetch_auth_token") {
        console.log("🔐 Signup complete, fetching auth token...");
        await handleFetchAuthToken(patientLoginData.request_id, values.mobile);
      }

    } catch (error) {
      console.error("❌ Signup flow error:", error);
      setErrortext("Signup failed. Please try again.");
    }
  };

  // Login flow
  const handleLoginFlow = async (values) => {
    console.log("🔑 Starting LOGIN flow...");
    
    try {
      const ROLE_ID = await AsyncStorage.getItem("curr_role_id");
      console.log("👤 Using ROLE_ID:", ROLE_ID);
      
      // Step 1: verify_username
      let postData = {
        step: "verify_username",
        request_id: patientLoginData.request_id,
        username: "+91" + values.mobile,
      };

      const step1Data = await makeAPICall(
        `${API_URL}/v2/login/${ROLE_ID}/`,
        postData,
        "verify_username"
      );

      if (step1Data.next === "send_login_otp") {
        console.log("📨 User exists, sending login OTP...");
        setIsUserExist(true);

        // Step 2: send_login_otp
        let sendOTPPostData = {
          step: "send_login_otp",
          request_id: patientLoginData.request_id,
          username: "+91" + values.mobile,
        };

        const step2Data = await makeAPICall(
          `${API_URL}/v2/login/${ROLE_ID}/`,
          sendOTPPostData,
          "send_login_otp"
        );

        if (step2Data.next === "verify_login_otp") {
          console.log("✅ OTP sent successfully, moving to verify OTP step");
          dashboardDispatch({
            type: "SET_PATIENT_LOGIN_DATA",
            payload: {
              ...patientLoginData,
              currentStep: "verify_otp",
              isSignup: false,
            },
          });
        }
      } else if (step1Data.next === "fetch_auth_token") {
        console.log("🔐 User verified, fetching auth token directly...");
        await handleFetchAuthToken(patientLoginData.request_id, values.mobile);
      } else if (!step1Data.success) {
        console.log("❌ User doesn't exist, switching to signup flow");
        setIsUserExist(false);
        setIsSignupUser(true);
        setErrortext(step1Data.message || "User not found. Please sign up.");
      }

    } catch (error) {
      console.error("❌ Login flow error:", error);
      setErrortext("Login failed. Please try again.");
    }
  };

  async function onSubmit(values) {
    console.log("🎯 Form submitted with values:", values);
    console.log("📱 Current state - isUserExist:", isUserExist, "isSignupUser:", isSignupUser);
    console.log("🔗 API_URL:", API_URL);
    console.log("📋 Patient Login Data:", patientLoginData);

    setLoading(true);
    setErrortext("");
    setMobileNumber(values.mobile);

    try {
      if (!isUserExist && isSignupUser) {
        await handleSignupFlow(values);
      } else {
        await handleLoginFlow(values);
      }
    } catch (error) {
      console.error("❌ Overall submission error:", error);
      setErrortext("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Formik
      initialValues={{ mobile: mobileNumber, termsAndConditions: false }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        values,
        errors,
        isValid,
      }) => (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
          <View style={styles.forms}>
            <View style={styles.formsInfo}>
              <Text style={{ fontSize: 20, color: '#000000', fontWeight: 700 }}>
                {t('auth.mobileNumber.title')}
              </Text>
              <Text style={styles.formInfoMoreMessage}>
                {t('auth.mobileNumber.subtitle')}
              </Text>
            </View>
            <View style={styles.formsContent}>
              <View style={styles.eachField}>
                <View style={styles.formsMobileField}>
                  <Text style={styles.formsMobileFieldLabel}>
                    {t('auth.mobileNumber.countryCode')}
                  </Text>
                  <TextInput
                    selectionColor={'#7C084B'}
                    style={styles.formsInputField}
                    onChangeText={(value) => {
                      if (value === '') {
                        setFieldValue('mobile', value);
                      }
                      if (
                        value.length <= 10 &&
                        value.match(/^[0-9]+$/) != null
                      ) {
                        setFieldValue('mobile', value);
                      }
                    }}
                    onBlur={handleBlur('mobile')}
                    value={values.mobile}
                    keyboardType="numeric"
                    placeholder={t('auth.mobileNumber.placeholder')}
                  />
                </View>
                <View
                  style={{
                    gap: 14,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 18,
                  }}
                >
                  <Checkbox
                    value={values.termsAndConditions}
                    onValueChange={(value) => {
                      setFieldValue('termsAndConditions', value);
                    }}
                    style={styles.checkbox}
                    color={values.termsAndConditions ? '#7C084B' : undefined}
                  />
                  <Text style={styles.checkboxLabel}>
                    {t('auth.termsAndConditions.agree')}{' '}
                    <Text
                      style={[styles.themeText]}
                      onPress={() => {
                        Linking.openURL(`${BASE_URL}/app-tnc/`);
                      }}
                    >
                      {t('auth.termsAndConditions.linkText')}
                    </Text>
                  </Text>
                </View>
                {errors.mobile && (
                  <Text style={styles.eachFieldError}>{errors.mobile}</Text>
                )}
                {errors.termsAndConditions && (
                  <Text style={styles.eachFieldError}>
                    {errors.termsAndConditions}
                  </Text>
                )}
                {errorText && (
                  <Text style={styles.userNotExist}>{errorText}</Text>
                )}
              </View>
             <TouchableOpacity
                style={{
                  padding: 14,
                  backgroundColor: values.termsAndConditions
                    ? "#7C084B"
                    : "#9A9A9A",
                  alignItems: "center",
                  borderRadius: 6,
                  opacity: values.termsAndConditions ? 1 : 0.6,
                }}
                onPress={values.termsAndConditions ? handleSubmit : null}
                disabled={!values.termsAndConditions}
              >
                {loading ? (
                  <ActivityIndicator size={"small"} color="#ffffff" />
                ) : (
                  <Text
                    style={{
                      color: values.termsAndConditions ? "#ffffff" : "#ffffff",
                      fontSize: 16,
                      fontWeight: 700,
                    }}
                  >
                    {t("common.next")}
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      )}
    </Formik>
  );
};

export default VerifyUserForm;