// import DeviceInfo from "react-native-device-info";
import { Platform } from "react-native";
import * as Crypto from "expo-crypto";

export const getDeviceId = () => {
  return Crypto.randomUUID();
};

export const getDeviceOS = () => {
  switch (Platform.OS) {
    case "ios":
      return "IOS";
    case "android":
      return "Android";
    default:
      return "IOS";
  }
};
