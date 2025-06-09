import { objectDecoder } from "json-decoder";
import { uploadAttachmentMessageDecoder } from "./UploadAttachmentMessage";

export const uploadAttachmentResponseDecoder = objectDecoder({
  message: uploadAttachmentMessageDecoder,
});
