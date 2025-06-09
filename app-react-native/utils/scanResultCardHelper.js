import { NetworkErrorType } from "../errors/NetworkError";
import { ScanValidationCode } from "../hooks/network/ScanValidationCode";

export const getScanResultCardData = (scanValidationResult, gs1Data) => {
  if (scanValidationResult.success) {
    return getSuccessScanResultCardData(
      scanValidationResult.success.response,
      gs1Data
    );
  }

  if (scanValidationResult.failure) {
    return getFailureScanResultCardData(scanValidationResult.failure.error);
  }

  return {
    type: "warning",
    title: "Network Issue",
    description: `There is some issue with the connection to the app validation server`,
    detail: `Please check your internet connection and try to scan the code again.`,
    buttonText: `Scan Again`,
    buttonActionType: "dismiss",
  };
};

const getSuccessScanResultCardData = (response, gs1Data) => {
  switch (response.code) {
    case ScanValidationCode.ValidProduct:
      return {
        type: "success",
        title: `Recognized`,
        description: `Your product is recognised`,
        gs1Data: gs1Data,
        productName: response.productDetails?.material_name,
        buttonText: `Scan Another Item`,
        buttonActionType: "dismiss",
      };
    case ScanValidationCode.ExpiredProduct:
      return {
        type: "failure",
        title: `Expired`,
        description: `Your product is recognised, but expired`,
        gs1Data: gs1Data,
        buttonText: `Scan Another Item`,
        buttonActionType: "dismiss",
      };
    case ScanValidationCode.GtinNotKnown:
      return {
        type: "failure",
        title: `Not Supported`,
        description: `This app does not support your product at the moment.`,
        buttonText: `Scan Another Item`,
        buttonActionType: "dismiss",
      };
    case ScanValidationCode.WrongCombination:
      return {
        type: "failure",
        title: `Not Recognized`,
        description: `This app does not recognize your product.`,
        detail: "",
        buttonText: `Submit Form`,
        buttonActionType: "submitForm",
      };
  }
};

const getFailureScanResultCardData = (networkError) => {
  switch (networkError.type) {
    case NetworkErrorType.Fetch:
      return {
        type: "warning",
        title: `Network Issue`,
        description: `There is some issue with the connection to the app validation server`,
        detail: `Please check your internet connection and try to scan the code again.`,
        buttonText: `Scan Again`,
        buttonActionType: "dismiss",
      };
    case NetworkErrorType.JsonDecoding:
    case NetworkErrorType.JsonParsing:
    case NetworkErrorType.StatusCode:
      return {
        type: "warning",
        title: `Server Issue`,
        description: `There is some issue with the app validation server`,
        detail: `Please try to scan the code again.`,
        buttonText: `Scan Again`,
        buttonActionType: "dismiss",
      };
    case NetworkErrorType.TimeOut:
      return {
        type: "warning",
        title: `Timeout Issue`,
        description: `Validation of your scanned code took longer then expected`,
        detail: `Please try to scan the code again.`,
        buttonText: `Scan Again`,
        buttonActionType: "dismiss",
      };
  }
};
