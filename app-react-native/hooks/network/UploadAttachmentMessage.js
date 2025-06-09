import { objectDecoder, stringDecoder } from "json-decoder";

export const uploadAttachmentMessageDecoder = objectDecoder({
  fileName: stringDecoder,
});
