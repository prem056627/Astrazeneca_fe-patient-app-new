import { scanValidationCodeDecoder } from "./ScanValidationCode";
import {
  objectDecoder,
  oneOfDecoders,
  stringDecoder,
  undefinedDecoder,
} from "json-decoder";
import { scanValidationProductDetailsDecoder } from "./ScanValidationProductDetails";

export const scanValidationResponseDecoder = objectDecoder({
  scanId: stringDecoder,
  code: scanValidationCodeDecoder,
  message: stringDecoder,
  productDetails: oneOfDecoders(
    scanValidationProductDetailsDecoder,
    undefinedDecoder
  ),
});
