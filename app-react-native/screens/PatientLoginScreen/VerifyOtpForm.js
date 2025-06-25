import AsyncStorage from "@react-native-async-storage/async-storage";
import { Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  Pressable,
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
import { getApiUrl, getUserRoleId } from "../../utils/helper";
import { styles } from "./styles";
import { OTPInput } from "../../components/OTPField";
import { useTranslation } from 'react-i18next';

const VerifyOtpForm = ({
  navigation,
  isUserExist,
  setIsUserExist,
  mobileNumber,
  setMobileNumber,
}) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [counter, setCounter] = React.useState(30);
  const [resendOtpSuccess, setResendOtpSuccess] = React.useState(false);
  const [isCorrectOTP, setIsCorrectOTP] = useState(true)
  const API_URL = getApiUrl();
  const [errorMessages, setErrorMessages] = useState();
  const [otp, setOtp] = useState(Array(6).fill(""));
  const refs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  const { patientLoginData } = useDashboard();
  const dashboardDispatch = useDashboardDispatch();

  const isOtpComplete = otp.join("").length === 6 && otp.every(digit => digit !== "");

  // Enhanced API call function with better error handling (from VerifyUserForm)
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

  // Handle fetch_auth_token step (from VerifyUserForm)
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
            currentStep: "webview",
            accessToken: data.access_token,
            refreshToken: data.refresh_token,
          },
        });

        // Navigate to webview
        console.log("🌐 Navigating to webview");
        navigation.navigate("WebviewScreen");
        
      } else {
        console.log("❌ Failed to get auth token:", data.message);
        setErrorMessages(data.message || "Failed to authenticate");
      }
    } catch (error) {
      console.error("❌ Error in handleFetchAuthToken:", error);
      setErrorMessages("Authentication failed. Please try again.");
    }
  };

  const onChangeCode = (text, index, setFieldValue) => {
    if (text.length > 1) {
      setErrorMessages(undefined);
      const newCodes = text.split("");
      setOtp(newCodes);
      setFieldValue("otp", newCodes.join(""));
      refs[5].current?.focus();
      return;
    }
    setErrorMessages(undefined);
    const newCodes = [...otp];
    newCodes[index] = text;
    setOtp(newCodes);
    setFieldValue("otp", newCodes.join(""));
    if (text !== "" && index < 5) {
      refs[index + 1].current?.focus();
    }
  };

  const handleEdit = () => {
    dashboardDispatch({
      type: "SET_PATIENT_LOGIN_DATA",
      payload: {
        ...patientLoginData,
        currentStep: "verify_username",
        isSignupUser: false,
      },
    });
  };

  const handleResendOtp = async () => {
    let ROLE_ID = await AsyncStorage.getItem("curr_role_id");

    // Enhanced resend logic for both login and signup
    const stepName = isUserExist ? 'resend_login_otp' : 'resend_signup_otp';
    let postData = {
      step: stepName,
      request_id: patientLoginData?.request_id,
    };

    // Add username for signup resend
    if (!isUserExist) {
      postData.username = "+91" + mobileNumber;
    }

    console.log('resend payload', postData);
    setLoading(true);
    
    try {
      const data = await makeAPICall(
        `${API_URL}/v2/login/${ROLE_ID}/`,
        postData,
        stepName
      );

      if (data.success) {
        setResendOtpSuccess(true);
        console.log('✅ OTP resent successfully');
      } else {
        console.log('❌ Failed to resend OTP:', data.message);
        setErrorMessages(data.message || 'Failed to resend OTP');
      }
      setCounter(30);
    } catch (error) {
      console.error('❌ Resend OTP error:', error);
      setErrorMessages('Failed to resend OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (counter > 0) {
      const timer = setTimeout(() => setCounter(counter - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [counter]);

  const validationSchema = yup.object().shape({
    otp: yup
      .string()
      .matches(/^[0-9]+$/, t('auth.verifyOtp.validation.digitsOnly'))
      .length(6, t('auth.verifyOtp.validation.length'))
      .required(t('auth.verifyOtp.validation.required')),
  });

  const storeCookies = async (setCookieHeader) => {
    try {
      const cookiesArray = setCookieHeader.split(", ");
      const cookies = {};

      cookiesArray.forEach((cookie) => {
        const [cookieName, cookieValue] = cookie.split(";")[0].split("=");
        if (cookieName === "csrftoken" || cookieName === "zelthycookie") {
          cookies[cookieName] = cookieValue;
        }
      });

      await AsyncStorage.setItem("@csrftoken", cookies.csrftoken);
      await AsyncStorage.setItem("@zelthycookie", cookies.zelthycookie);

      console.log("Cookies stored:", cookies);
    } catch (e) {
      console.error("Failed to store cookies.", e);
    }
  };

  async function onSubmit(values) {
    console.log("🎯 OTP Form submitted with values:", values);
    console.log("📱 Current state - isUserExist:", isUserExist);
    console.log("📱 Mobile number:", mobileNumber);

    Keyboard.dismiss();
    setLoading(true);
    setErrorMessages(undefined);
    setIsCorrectOTP(true);

    try {
      let ROLE_ID = await AsyncStorage.getItem('curr_role_id');

      let postData = {
        step: isUserExist ? "verify_login_otp" : "verify_signup_otp",
        request_id: patientLoginData?.request_id,
        otp: Number(values.otp),
        username: "+91" + mobileNumber,
        consent_text: "",
      };

      console.log("📤 OTP verification payload:", postData);

      const data = await makeAPICall(
        `${API_URL}/v2/login/${ROLE_ID}/`,
        postData,
        isUserExist ? "verify_login_otp" : "verify_signup_otp"
      );

      // Handle response based on next step
      if (data.message === 'Invalid OTP') {
        console.log("❌ Invalid OTP provided");
        setIsCorrectOTP(false);
        setOtp(Array(6).fill(''));
        setErrorMessages(data.message || 'Invalid OTP. Please try again.');
      } else if (data.next === "done") {
        console.log("✅ OTP verified successfully, storing tokens");
        await AsyncStorage.setItem("access_token", data.access_token);
        await AsyncStorage.setItem("refresh_token", data.refresh_token);
        
        // Update dashboard state
        dashboardDispatch({
          type: "SET_PATIENT_LOGIN_DATA",
          payload: {
            ...patientLoginData,
            currentStep: "webview",
            accessToken: data.access_token,
            refreshToken: data.refresh_token,
          },
        });
        
        navigation.navigate("WebviewScreen");
      } else if (data.next === "fetch_auth_token") {
        console.log("🔐 OTP verified, proceeding to fetch auth token");
        await handleFetchAuthToken(patientLoginData.request_id, mobileNumber);
      } else {
        console.log("⚠️ Unexpected response:", data);
        setErrorMessages(data.message || 'Verification failed. Please try again.');
      }

    } catch (error) {
      console.error("❌ OTP verification error:", error);
      setErrorMessages('Verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const otpConfig = {
    borderColor: "#D4D4D4",
    backgroundColor: "#fff",
    textColor: "#000",
    errorColor: "#dc2626",
    focusColor: "#7C084B",
  };

  return (
    <Formik
      initialValues={{ otp: "" }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({
        setFieldValue,
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
      }) => (
        <View style={styles.forms}>
          <View style={styles.formsInfo}>
            <Text style={{ fontSize: 20, color: "#000000", fontWeight: 700 }}>
              {t("auth.verifyOtp.title")}
            </Text>
            <View style={styles.formOtpInfoBox}>
              <Text style={styles.formOtpInfoLabel}>
                {t("auth.verifyOtp.enterOtp")}
                <Text style={{ fontWeight: 700 }}> +91 {mobileNumber}</Text>
              </Text>
              <Pressable>
                <Text
                  style={{ fontSize: 14, color: "#7C084B", fontWeight: 700 }}
                  onPress={handleEdit}
                >
                  {t("auth.verifyOtp.edit")}
                </Text>
              </Pressable>
            </View>
          </View>
          <View style={styles.formsContent}>
            <View style={{ gap: 24 }}>
              <OTPInput
                codes={otp}
                errorMessages={errors.otp}
                onChangeCode={(text, index) =>
                  onChangeCode(text, index, setFieldValue)
                }
                refs={refs}
                config={otpConfig}
                name="otp"
              />
              {errors.otp && (
                <Text style={{ fontSize: 14, color: "#B81111" }}>
                  {errors.otp}
                </Text>
              )}

              {!isCorrectOTP && (
                <Text style={styles.userNotExist}>
                  {t("auth.verifyOtp.incorrectOtp")}
                </Text>
              )}

              {resendOtpSuccess && (
                <Text style={styles.formOtpInfoLabel}>
                  {t("auth.verifyOtp.otpSentSuccess")}
                  <Text style={styles.formOtpMobile}> {mobileNumber}</Text>
                </Text>
              )}

              {counter === 0 ? (
                <TouchableOpacity onPress={handleResendOtp}>
                  <Text
                    style={{ fontWeight: 700, fontSize: 14, color: "#7C084B" }}
                  >
                    {t("auth.verifyOtp.resendOtp")}
                  </Text>
                </TouchableOpacity>
              ) : (
                <Text>
                  {t("auth.verifyOtp.resendIn")} {counter}{" "}
                  {t("auth.verifyOtp.seconds")}
                </Text>
              )}
            </View>
            <View style={styles.formSubmitBox}>
              {patientLoginData?.isSignupUser && (
                <Text style={styles.formMoreInfo}>
                  {t("auth.verifyOtp.aadharNote")}
                </Text>
              )}
              <TouchableOpacity
                style={[
                  !isOtpComplete || loading
                    ? styles.formSubmitButtonDisabled
                    : styles.formSubmitButton,
                  { opacity: !isOtpComplete || loading ? 0.5 : 1 },
                ]}
                onPress={handleSubmit}
                disabled={!isOtpComplete || loading}
              >
                {loading ? (
                  <ActivityIndicator size={"large"} color="#ffffff" />
                ) : (
                  <Text
                    style={{ color: "#ffffff", fontSize: 16, fontWeight: 700 }}
                  >
                    {patientLoginData?.isSignupUser
                      ? t("auth.verifyOtp.verifyAndProceed")
                      : t("auth.verifyOtp.login")}
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </Formik>
  );
};
export default VerifyOtpForm;
