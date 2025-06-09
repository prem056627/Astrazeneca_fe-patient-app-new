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
  // const ROLE_ID = getUserRoleId();
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

    let postData = {
			step: 'resend_login_otp',
			request_id: patientLoginData?.request_id,
		};

     console.log('resend payload', postData);
    setLoading(true);
    fetch(`${API_URL}/v2/login/${ROLE_ID}/`, {
			method: 'POST',
			body: JSON.stringify(postData),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((response) => response.json())
			.then((data) => {
				setLoading(false);
				if (data.success) {
					setResendOtpSuccess(true);
				}

				console.log('resend otp', data);

				setCounter(30);
			})
			.catch((error) => {
				setLoading(false);
				console.error(error);
			});
  };

  useEffect(() => {
    if (counter > 0) {
      const timer = setTimeout(() => setCounter(counter - 1), 1000);
      return () => clearTimeout(timer); // Cleanup timer on unmount
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
      // Split the cookies by ", " since multiple cookies are separated this way
      const cookiesArray = setCookieHeader.split(", ");

      // Initialize an object to store cookies
      const cookies = {};

      // Extract the specific cookies we need
      cookiesArray.forEach((cookie) => {
        const [cookieName, cookieValue] = cookie.split(";")[0].split("=");
        if (cookieName === "csrftoken" || cookieName === "zelthycookie") {
          cookies[cookieName] = cookieValue;
        }
      });

      // Store cookies in AsyncStorage
      await AsyncStorage.setItem("@csrftoken", cookies.csrftoken);
      await AsyncStorage.setItem("@zelthycookie", cookies.zelthycookie);

      console.log("Cookies stored:", cookies);
    } catch (e) {
      console.error("Failed to store cookies.", e);
    }
  };

  async function onSubmit(values) {
    Keyboard.dismiss();
    setLoading(true);

    let ROLE_ID = await AsyncStorage.getItem('curr_role_id');

    console.log(
      "numberfwsdfvwfdsdsrefwrq3rerr",
      Number(values.otp),
      mobileNumber
    );

    let postData = {
      step: isUserExist ? "verify_login_otp" : "verify_signup_otp",
      request_id: patientLoginData?.request_id,
      otp: Number(values.otp),
      username: "+91" + mobileNumber,
      consent_text: "",
    };

    console.log("get otp payload", postData);

    await fetch(`${API_URL}/v2/login/${ROLE_ID}/`, {
      method: "POST",
      body: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        // const setCookieHeader = response.headers.get("Set-Cookie");
        // if (setCookieHeader) {
        //   storeCookies(setCookieHeader);
        // }
        // console.log(">>>>>>>>>>>>>>>>", response);
        return response.json();
      })
      .then((data) => {
        setLoading(false);

        console.log("user logged in =>>>>>>>>>>>>>>>>", data);
        if (data.message == 'Invalid OTP') {
          setIsCorrectOTP(false)
          setOtp(Array(6).fill(''));
				}
        if (data.next === "done") {
          AsyncStorage.setItem("access_token", data.access_token);
          AsyncStorage.setItem("refresh_token", data.refresh_token);
          navigation.navigate("WebviewScreen");
        } else {
          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  }

  const otpConfig = {
    borderColor: "#D4D4D4",
    backgroundColor: "#fff",
    textColor: "#000",
    errorColor: "#dc2626",
    focusColor: "#BE2BBB",
  };

  return (
		<Formik
			initialValues={{ otp: '' }}
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
						<Text style={{ fontSize: 20, color: '#000000', fontWeight: 700 }}>
							{t('auth.verifyOtp.title')}
						</Text>
						<View style={styles.formOtpInfoBox}>
							<Text style={styles.formOtpInfoLabel}>
								{t('auth.verifyOtp.enterOtp')}
								<Text style={{ fontWeight: 700 }}> +91 {mobileNumber}</Text>
							</Text>
							<Pressable>
								<Text
									style={{ fontSize: 14, color: '#BE2BBB', fontWeight: 700 }}
									onPress={handleEdit}
								>
									{t('auth.verifyOtp.edit')}
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
								<Text style={{ fontSize: 14, color: '#B81111' }}>
									{errors.otp}
								</Text>
							)}

							{!isCorrectOTP && (
								<Text style={styles.userNotExist}>
									{t('auth.verifyOtp.incorrectOtp')}
								</Text>
							)}

							{resendOtpSuccess && (
								<Text style={styles.formOtpInfoLabel}>
									{t('auth.verifyOtp.otpSentSuccess')}
									<Text style={styles.formOtpMobile}> {mobileNumber}</Text>
								</Text>
							)}

							{counter === 0 ? (
								<TouchableOpacity onPress={handleResendOtp}>
									<Text
										style={{ fontWeight: 700, fontSize: 14, color: '#BE2BBB' }}
									>
										{t('auth.verifyOtp.resendOtp')}
									</Text>
								</TouchableOpacity>
							) : (
								<Text>
									{t('auth.verifyOtp.resendIn')} {counter} {t('auth.verifyOtp.seconds')}
								</Text>
							)}
						</View>
						<View style={styles.formSubmitBox}>
							{patientLoginData?.isSignupUser && (
								<Text style={styles.formMoreInfo}>
									{t('auth.verifyOtp.aadharNote')}
								</Text>
							)}
							<TouchableOpacity
								style={
									otp.length < 6
										? styles.formSubmitButtonDisabled
										: styles.formSubmitButton
								}
								onPress={handleSubmit}
								disabled={otp.length < 6}
							>
								{loading ? (
									<ActivityIndicator size={'large'} color="#ffffff" />
								) : (
									<Text
										style={{ color: '#ffffff', fontSize: 16, fontWeight: 700 }}
									>
										{patientLoginData?.isSignupUser
											? t('auth.verifyOtp.verifyAndProceed')
											: t('auth.verifyOtp.login')}
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
