import {
  objectDecoder,
  oneOfDecoders,
  stringDecoder,
  undefinedDecoder,
} from "json-decoder";

export const scanValidationProductDetailsDecoder = objectDecoder({
  material_name: oneOfDecoders(stringDecoder, undefinedDecoder),
});
