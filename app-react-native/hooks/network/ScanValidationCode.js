import { numberDecoder } from "json-decoder";

export let ScanValidationCode;
(function (ScanValidationCode) {
  ScanValidationCode[(ScanValidationCode["ValidProduct"] = 1)] = "ValidProduct";
  ScanValidationCode[(ScanValidationCode["ExpiredProduct"] = 2)] =
    "ExpiredProduct";
  ScanValidationCode[(ScanValidationCode["GtinNotKnown"] = 3)] = "GtinNotKnown";
  ScanValidationCode[(ScanValidationCode["WrongCombination"] = 4)] =
    "WrongCombination";
})(ScanValidationCode || (ScanValidationCode = {}));

const getScanValidationCodeFromNumber = (value) => {
  switch (value) {
    case 1:
      return ScanValidationCode.ValidProduct;
    case 2:
      return ScanValidationCode.ExpiredProduct;
    case 3:
      return ScanValidationCode.GtinNotKnown;
    case 4:
      return ScanValidationCode.WrongCombination;
    default:
      throw new Error(`Could not decode ${value} to ScanValidationCode`);
  }
};

export const scanValidationCodeDecoder = numberDecoder.map(
  getScanValidationCodeFromNumber
);
