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
// import CookieManager from "@react-native-cookies/cookies";
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
  const BASE_URL = getBaseUrl()
  // const ROLE_ID = getUserRoleId()
  const [isSignupUser, setIsSignupUser] = useState(false)

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

  const handlePatientData = (request_id, mobile, currentStep) => {
    setMobileNumber(mobile);
    dashboardDispatch({
      type: "SET_PATIENT_LOGIN_DATA",
      payload: {
        request_id: request_id,
        mobile: mobile,
        currentStep: currentStep,
      },
    });
  };

  async function onSubmit(values) {
    console.log(
      "mobile data",
      values,
      patientLoginData.request_id,
      isUserExist,
      API_URL
    );

    setLoading(true);
    setMobileNumber(values.mobile);

    // if (!isUserExist && isSignupUser) {
    //   let postData = {
    //     step: "signup_username",
    //     request_id: patientLoginData.request_id,
    //     username: "+91" + values.mobile,
    //   };

    //   // console.log("postData", postData);
    //   await fetch(`${API_URL}/v2/login/403/`, {
    //     method: "POST",
    //     body: JSON.stringify(postData),
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   })
    //     .then((response) => {
    //       return response.json();
    //     })
    //     .then(async (data) => {
    //       console.log("step 2 --->> signup_username =>>>>>>>>>", data);

    //       let consentPostData = {
    //         step: "submit_consent",
    //         request_id: patientLoginData.request_id,
    //         username: "+91" + values.mobile,
    //         consent_text: "",
    //       };

    //       await fetch(`${API_URL}/v2/login/403/`, {
    //         method: "POST",
    //         body: JSON.stringify(consentPostData),
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //       })
    //         .then((response) => {
    //           return response.json();
    //         })
    //         .then(async (data) => {
    //           console.log("step 3 --->> submit_consent =>>>>>>>>>", data);
    //           setLoading(false);
    //           if (data.next === "send_signup_otp") {
    //             let sendOtpPostdata = {
    //               step: "send_signup_otp",
    //               request_id: patientLoginData.request_id,
    //               username: "+91" + values.mobile,
    //               consent_text: "",
    //             };

    //             await fetch(`${API_URL}/v2/login/403/`, {
    //               method: "POST",
    //               body: JSON.stringify(sendOtpPostdata),
    //               headers: {
    //                 "Content-Type": "application/json",
    //               },
    //             })
    //               .then((response) => {
    //                 return response.json();
    //               })
    //               .then((data) => {
    //                 console.log("step 4 --->> get otp =>>>", data);
    //                 dashboardDispatch({
    //                   type: "SET_PATIENT_LOGIN_DATA",
    //                   payload: {
    //                     ...patientLoginData,
    //                     currentStep: "verify_otp",
    //                   },
    //                 });
    //               });
    //           }
    //         });

    //       if (data.next === "verify_login_otp") {
    //         dashboardDispatch({
    //           type: "SET_PATIENT_LOGIN_DATA",
    //           payload: {
    //             ...patientLoginData,
    //             currentStep: "verify_otp",
    //           },
    //         });
    //       }
    //     });
    // } else {
    let ROLE_ID = await AsyncStorage.getItem("curr_role_id");
    let postData = {
      step: "verify_username",
      request_id: patientLoginData.request_id,
      username: "+91" + values.mobile,
    };

    fetch(`${API_URL}/v2/login/${ROLE_ID}/`, {
      method: "POST",
      body: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then(async (data) => {
        console.log("step 1 --->> verify_username =>>>>>>>>>", data);
        if (data.next === "send_login_otp") {
          setIsUserExist(true);

          let sendOTPPostData = {
            step: "send_login_otp",
            request_id: patientLoginData.request_id,
            username: "+91" + values.mobile,
          };

          await fetch(`${API_URL}/v2/login/${ROLE_ID}/`, {
            method: "POST",
            body: JSON.stringify(sendOTPPostData),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              console.log("send_login_otp =>>>>>>>>>", data);
              if (data.next === "verify_login_otp") {
                dashboardDispatch({
                  type: "SET_PATIENT_LOGIN_DATA",
                  payload: {
                    ...patientLoginData,
                    currentStep: "verify_otp",
                  },
                });
              }
              setLoading(false);
            });
        } else if (!data.success) {
          setIsUserExist(false);
          setIsSignupUser(true);
          setLoading(false);
          setErrortext(data.message);
        }
      })
      .catch((error) => {
        setLoading(false);

        console.error(error);
      });
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
        <SafeAreaView style={{ flex: 1 }}>
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
                    selectionColor={'#BE2BBB'}
                    style={styles.formsInputField}
										// onChangeText={handleChange("mobile")}
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
                    gap: 8,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <Checkbox
                    value={values.termsAndConditions}
                    onValueChange={(value) => {
                      setFieldValue('termsAndConditions', value);
                    }}
                    style={styles.checkbox}
                    color={values.termsAndConditions ? '#BE2BBB' : undefined}
                  />
                  <Text style={styles.checkboxLabel}>
                    {t('auth.termsAndConditions.agree')}{' '}
                    <Text
                      style={[styles.themeText]}
                      onPress={() => {
												Linking.openURL(
													`${BASE_URL}/app-tnc/`
													// '/app-tnc/'
												);
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
                  backgroundColor: '#BE2BBB',
                  alignItems: 'center',
                  borderRadius: 6,
                }}
                onPress={handleSubmit}
              >
                {loading ? (
                  <ActivityIndicator size={'small'} color="#ffffff" />
                ) : (
                  <Text
                    style={{ color: '#ffffff', fontSize: 16, fontWeight: 700 }}
                  >
                    {t('common.next')}
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
