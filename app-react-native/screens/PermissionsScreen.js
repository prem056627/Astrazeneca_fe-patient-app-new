import { Camera } from "expo-camera";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect } from "react";

import BrandLogo from "../assets/bms_brand_logo.svg";
import * as Location from "expo-location";
import * as MediaLibrary from "expo-media-library";
import { useEffect } from "react";
import { Linking } from "react-native";

export default function PermissionsScreen({ route, navigation }) {
  const [cameraPermission, requestCameraPermission] =
    Camera.useCameraPermissions();
  // const [locationPermission, requestLocationPermission] =
  //   Location.useForegroundPermissions();
  // const [mediaPermission, requestMediaPermission] =
  //   MediaLibrary.usePermissions();

  useEffect(() => {
    // if (cameraPermission && locationPermission && mediaPermission) {
    if (cameraPermission) {
        if (
        cameraPermission?.granted 
        // &&
        // locationPermission?.granted &&
        // mediaPermission?.granted
      ) {
        navigation.navigate("CommonLoginPage");
      }
    }
  // }, [cameraPermission, locationPermission, mediaPermission]);
}, [cameraPermission]);


  // if (!cameraPermission && !locationPermission && !mediaPermission) {
  //   return <View />;
  // }
  if (!cameraPermission) {
    return <View />;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F6F6F6" }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <BrandLogo />
        <>
          <Text style={{ textAlign: "center", padding: 16, fontSize: 14 }}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              Disclaimer
            </Text>{" "}
            : MSD KeyPAP application is a Patient Assistance Program. The
            application allows package verification and program enrolment for
            users as outlined by PAP Team. The application requires access to
            your device's storage, camera, and location for scanning and
            completing enrolment process. We respect your privacy and are
            committed to protecting your personal information.
          </Text>
        </>
        {/* {mediaPermission?.granted ? null : (
          <>
            <Text style={{ textAlign: "center", padding: 16, fontSize: 14 }}>
              We need storage permission to upload images, and other files for
              use within the app.
            </Text>
            <TouchableOpacity
              style={styles.formSubmitButton}
              onPress={requestMediaPermission}
            >
              <Text style={styles.formSubmitButtonLabel}>Continue</Text>
            </TouchableOpacity>
          </> 
        )} */}
        {cameraPermission?.granted ? null : (
          <>
            <Text style={{ textAlign: "center", padding: 16, fontSize: 14 }}>
              We need camera permission to enable scanning of barcodes in the
              app.
            </Text>
            <TouchableOpacity
              style={styles.formSubmitButton}
              onPress={requestCameraPermission}
            >
              <Text style={styles.formSubmitButtonLabel}>Continue</Text>
            </TouchableOpacity>
          </>
        )}
        {/* {locationPermission?.granted ? null : (
          <>
            <Text style={{ textAlign: "center", padding: 16, fontSize: 14 }}>
              We need location permissions for eKYC completion.
            </Text>
            <TouchableOpacity
              style={styles.formSubmitButton}
              onPress={requestLocationPermission}
            >
              <Text style={styles.formSubmitButtonLabel}>Continue</Text>
            </TouchableOpacity>
          </>
        )} */}
      </View>
      <Text
        onPress={() => Linking.openURL("https://www.msdprivacy.com/in/en/")}
        style={{
          textAlign: "center",
          padding: 16,
          fontSize: 16,
          fontWeight: 700,
          color: "#7C084B",
        }}
      >
        Privacy Policy
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  formSubmitButton: {
    padding: 14,
    backgroundColor: "#7C084B",
    alignItems: "center",
  },
  formSubmitButtonLabel: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: 700,
  },
});
