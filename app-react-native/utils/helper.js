import Constants from "expo-constants";

export const getBaseUrl = () => {
  let baseUrl = Constants.expoConfig.extra.baseUrl;
  return baseUrl;
};

export const getApiUrl = () => {
  let apiUrl = Constants.expoConfig.extra.apiUrl;
  return apiUrl;
};

export const getApiUrlTNT = () => {
  let apiUrlTNT = Constants.expoConfig.extra.apiUrlTNT;
  return apiUrlTNT;
};

export const getPackVerificationApiKey = () => {
  let apiKey = Constants.expoConfig.extra.apiKey;
  return apiKey;
};

export const getTriggerApiKey = () => {
  let triggerApiKey = Constants.expoConfig.extra.triggerApiKey;
  return triggerApiKey;
};

export const getPackVerificationBackendUrl = () => {
  let packVerificationUrl = Constants.expoConfig.extra.packVerificationUrl;
  return packVerificationUrl;
};

export const getUserRoleId = (usr_type) => {
  let userRoleId = Constants.expoConfig.extra.userRoleId;
  return userRoleId[usr_type];
};

export const getWebviewUrl = () => {
  let webviewUrl = Constants.expoConfig.extra.webviewUrl;
  return webviewUrl;
};

export const getUserRole = (user_role_id) => {
  let userRole = Constants.expoConfig.extra.userRoleMap;
  return userRole[user_role_id];
};
