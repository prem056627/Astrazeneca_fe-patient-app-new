import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 0,
    backgroundColor: "white",
  },
  nav: {
    alignItems: "center",
    // padding: 16,
    // paddingTop: 52,
    // paddingBottom: 16,
  },
  brandLogo: {
    flex: 1,
    width: 100,
    height: 100,
    backgroundColor: "#FF00FF",
  },
  main: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-start",
    gap: 24,
    padding: 0,
    paddingLeft: 24,
    paddingRight: 24,
  },
  forms: {
    flex: 1,
    gap: 24,
  
  },
  formsInfo: {
    gap: 4,
    // marginTop: 58,
      // backgroundColor:'red'
  },
  formInfoLabel: {
    fontSize: 20,
    color: "#000000",
    fontWeight: 700,
  },
  formInfoMoreMessage: {
    color: "#696969",
    fontSize: 14,
    fontStyle: "italic",
  },
  formMoreInfo: {
    color: "#696969",
    fontSize: 12,
    fontStyle: "italic",
  },
  formsContent: {
    flex: 1,
    justifyContent: "space-between",
  },
  formOtpInfoBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flexWrap: "wrap",
  },
  formOtpInfoLabel: {
    color: "#696969",
  },
  formOtpMobile: {
    fontWeight: 700,
  },
  editButton: {
    fontSize: 14,
    color: "#7C084B",
    fontWeight: 700,
  },
  eachField: {
    gap: 8,
  },
  eachFieldError: {
    fontSize: 14,
    color: "#B81111",
  },
  formsMobileField: {
    flexDirection: "row",
    alignItems: "center",
    fontSize: 16,
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#D4D4D4",
    gap: 8,
    borderRadius: 6
  },
  formsMobileFieldLabel: {
    fontSize: 16,
  },
  formsInputField: {
    fontSize: 16,
    width: "100%",
  },
  formSubmitBox: {
    gap: 12,
  },
  formSubmitButton: {
    padding: 14,
    backgroundColor: "#7C084B",
    alignItems: "center",
    borderRadius: 6
  },
  formSubmitButtonDisabled: {
    padding: 14,
    backgroundColor: "#9A9A9A",
    alignItems: "center",
    borderRadius: 6
  },
  formSubmitButtonLabel: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: 700,
  },
  formResendOtpLabel: {
    fontWeight: 700,
    fontSize: 14,
    color: "#7C084B",
  },
  checkbox: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 16,
  },
  checkboxLabel: {
    fontSize: 16,
    color: "#000000",
  },
  tickBox: {
    marginTop: 4,
    backgroundColor: "#ffffff",
    borderWidth: 2,
    borderColor: "#696969",
    alignItems: "center",
    width: 20,
    height: 20,
  },
  tickBoxChecked: {
    marginTop: 4,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#7C084B",
    borderWidth: 2,
    borderColor: "#7C084B",
    alignItems: "center",
    width: 20,
    height: 20,
  },
  themeText: {
    fontWeight: 600,
    color: "#7C084B",
  },
  userNotExist: {
    backgroundColor: "#7C084B29",
    color: "#7C084B",
    padding: 12
  },
});
