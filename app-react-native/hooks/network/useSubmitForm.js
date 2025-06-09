import { useEffect, useState } from "react";
import { NetworkError, NetworkErrorType } from "../../errors/NetworkError";
import {
  getPackVerificationApiKey,
  getPackVerificationBackendUrl,
} from "../../utils/helper";
import { uploadAttachmentResponseDecoder } from "./UploadAttachmentResponse";

const getFileName = (filePath, scanId) => {
  return filePath.split("/").pop() || `${scanId}.jpeg`;
};

export const useSubmitForm = (attachments, submitFormPayload) => {
  const [submitFormResult, setSubmitFormResult] = useState();

  useEffect(() => {
    const submitFilledForm = async (attachedPhotos, payload) => {
      try {
        const uploadedFileNames = await Promise.all(
          attachedPhotos?.map(
            async (photoFilePath) =>
              await uploadAttachment(payload.scanId, photoFilePath)
          )
        );

        await submitForm(payload, uploadedFileNames);

        setSubmitFormResult("success");
      } catch {
        setSubmitFormResult("failure");
      }
    };

    if (!submitFormPayload) {
      setSubmitFormResult(undefined);
      return;
    }

    setSubmitFormResult("processing");
    submitFilledForm(attachments, submitFormPayload);
  }, [attachments, submitFormPayload]);

  return submitFormResult;
};

const uploadAttachment = async (scanId, filePath) => {
  const headers = new Headers({
    source: "MSDKeYPaP",
    "X-Merck-APIKey": getPackVerificationApiKey(),
  });

  const formData = new FormData();

  let uriParts = filePath?.assets[0]?.uri.split(".");
  let fileType = filePath?.assets[0]?.uri[filePath?.assets[0]?.uri.length - 1];

  formData.append("files", {
    uri: filePath?.assets[0]?.uri,
    name: `photo.${fileType}`,
    type: `image/${fileType}`,
  });

  const response = await fetch(
    `${getPackVerificationBackendUrl()}/scan/uploadAttachments/${scanId}`,
    {
      method: "POST",
      headers,
      body: formData,
    }
  ).catch((error) => {
    const fetchError = new NetworkError(NetworkErrorType.Fetch, error.message);
    console.error(fetchError.message);
    throw fetchError;
  });

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
    console.error(jsonParsingError.message);
    throw jsonParsingError;
  });

  const uploadAttachmentResponse = await uploadAttachmentResponseDecoder
    .decodeAsync(responseJson)
    .catch((error) => {
      const jsonDecodingError = new NetworkError(
        NetworkErrorType.JsonDecoding,
        error.message
      );
      console.error(jsonDecodingError.message);
      throw jsonDecodingError;
    });

  return uploadAttachmentResponse.message.fileName;
};

const submitForm = async (payload, attachments) => {
  const headers = new Headers({
    source: "MSDKeYPaP",
    "Content-Type": "application/json",
    "X-Merck-APIKey": getPackVerificationApiKey(),
  });

  const response = await fetch(
    `${getPackVerificationBackendUrl()}/scan/submitForm`,
    {
      method: "POST",
      headers,
      body: JSON.stringify({ ...payload, attachments }),
    }
  ).catch((error) => {
    const fetchError = new NetworkError(NetworkErrorType.Fetch, error.message);
    console.error(fetchError.message);
    throw fetchError;
  });

  const statusCode = response.status;
  if (statusCode !== 200) {
    const statusCodeError = new NetworkError(NetworkErrorType.StatusCode);
    console.error(statusCodeError.message);
    throw statusCodeError;
  }
};
