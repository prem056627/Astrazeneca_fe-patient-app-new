import { useEffect, useState } from "react";
import { NetworkError, NetworkErrorType } from "../../errors/NetworkError";
import { getYearMonthDayString } from "../../utils/dateHelper";
import { getDeviceId, getDeviceOS } from "../../utils/deviceHelper";
import { getApiUrlTNT, getPackVerificationApiKey } from "../../utils/helper";
import { scanValidationResponseDecoder } from "./scanValidationResponseDecoder";

export const useScanValidation = (coordinates, gs1Data) => {
  const [scanValidationResult, setScanValidationResult] = useState();

  useEffect(() => {
    const validateScannnedCode = async (coords, gs1) => {
      let result;
      try {
        const response = false
          ? await validateScanMocked(gs1)
          : await validateScan(coords, gs1);
        result = { success: { response } };
      } catch (error) {
        // TODO: error casting
        result = { failure: { error } };
      }
      setScanValidationResult(result);
    };

    // TODO: Resolve possible coordinates error - timeout, position unavailable
    if (!coordinates || !gs1Data) {
      return;
    }

    validateScannnedCode(coordinates, gs1Data);
  }, [coordinates, gs1Data]);

  return scanValidationResult;
};

const validateScan = async (coordinates, gs1Data) => {
  const payload = {
    serialNo: gs1Data.serialNumber,
    gtin: gs1Data.gtin,
    batchId: gs1Data.batchNumber,
    expiryDate:
      gs1Data.expirationDate && getYearMonthDayString(gs1Data.expirationDate),
    deviceId: getDeviceId(),
    deviceOS: getDeviceOS(),
    location: { lat: coordinates.latitude, lng: coordinates.longitude },
  };

  const headers = new Headers({
    source: "MSDKeYPaP",
    "Content-Type": "application/json",
    "X-Merck-APIKey": getPackVerificationApiKey(),
  });

  const response = await fetch(`${getApiUrlTNT()}/verify-pack/`, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  }).catch((error) => {
    const fetchError = new NetworkError(NetworkErrorType.Fetch, error.message);
    throw fetchError;
  });

  console.log("response.type =", response.type);
  const statusCode = response.status;
  if (statusCode !== 200) {
    let responseJson;
    try {
      responseJson = await response.json();
    } catch {
      responseJson = undefined;
    }

    let errorDetail = `status code: ${statusCode}`;
    errorDetail += ` // detail: ${JSON.stringify(responseJson)}`;
    const statusCodeError = new NetworkError(
      NetworkErrorType.StatusCode,
      errorDetail
    );
    console.error(statusCodeError.message);
    throw statusCodeError;
  }

  const responseJson = await response.json().catch((error) => {
    const jsonParsingError = new NetworkError(
      NetworkErrorType.JsonParsing,
      error.message
    );
    console.error("here");
    console.error(jsonParsingError.message);
    throw jsonParsingError;
  });

  console.log(responseJson);

  const scanValidationResponse = await scanValidationResponseDecoder
    .decodeAsync(responseJson)
    .catch((error) => {
      const jsonDecodingError = new NetworkError(
        NetworkErrorType.JsonDecoding,
        error.message
      );
      console.error(jsonDecodingError.message);
      throw jsonDecodingError;
    });

  return scanValidationResponse;
};

const validateScanMocked = async (gs1Data) => {
  let response;
  let error;

  switch (gs1Data.batchNumber) {
    case "111111111":
      response = { scanId: "1", code: 1, message: "Valid Product" };
      break;
    case "222222222":
      response = { scanId: "2", code: 2, message: "Expired Product" };
      break;
    case "333333333":
      response = { scanId: "3", code: 3, message: "GTIN Not Known" };
      break;
    case "444444444":
      response = { scanId: "4", code: 4, message: "Wrong Combination" };
      break;
    case "777777777":
      error = new NetworkError(NetworkErrorType.Fetch);
      break;
    case "888888888":
      error = new NetworkError(NetworkErrorType.StatusCode);
      break;
    case "999999999":
      error = new NetworkError(NetworkErrorType.TimeOut);
      break;
    default:
      error = new NetworkError(NetworkErrorType.StatusCode);
      break;
  }

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      response ? resolve(response) : reject(error);
    }, 1000);
  });
};
