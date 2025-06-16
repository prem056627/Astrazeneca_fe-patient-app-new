import { Formik } from "formik";
import React from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as yup from "yup";
import BackArrowIcon from "../../assets/back_arrow_icon.svg";
import {
  useDashboard,
  useDashboardDispatch,
} from "../../context/DashboardContextProvider";
import { styles } from "./styles";

const PatientDetailForm = ({
  navigation,
  loading,
  setIsSignup,
  setPatientName,
}) => {
  const { patientLoginData } = useDashboard();

  const dashboardDispatch = useDashboardDispatch();

  const validationSignupSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
  });

  const onSignUpSubmit = (values) => {
    setPatientName(values.name);
    setIsSignup(false);
  };

  const handleBack = () => {
    dashboardDispatch({
      type: "SET_PATIENT_LOGIN_DATA",
      payload: {
        ...patientLoginData,
        currentStep: "verify_user",
        isSignupUser: false,
      },
    });
  };

  return (
    <Formik
      initialValues={{ name: "" }}
      validationSchema={validationSignupSchema}
      onSubmit={onSignUpSubmit}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        isValid,
      }) => (
        <View style={styles.forms}>
          <TouchableOpacity onPress={handleBack}>
            <BackArrowIcon />
          </TouchableOpacity>
          <View style={styles.formsInfo}>
            <Text style={styles.formInfoLabel}>Enter full name</Text>
          </View>
          <View style={styles.formsContent}>
            <View style={styles.eachField}>
              <View style={styles.formsMobileField}>
                <TextInput
                  selectionColor={"#7C084B"}
                  style={styles.formsInputField}
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                  value={values.name}
                  placeholder="Enter full name"
                />
              </View>
              {errors.name && (
                <Text style={styles.eachFieldError}>{errors.name}</Text>
              )}
            </View>
            <TouchableOpacity
              style={styles.formSubmitButton}
              onPress={handleSubmit}
            >
              {loading ? (
                <ActivityIndicator size={"large"} color="#ffffff" />
              ) : (
                <Text style={styles.formSubmitButtonLabel}>Next</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default PatientDetailForm;
