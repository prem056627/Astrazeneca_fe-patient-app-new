import { GS1Identifier } from "./gs1Code/GS1Identifier";

const gs1js = require("gs1js");

export const parseGs1Code = (code) => {
  const gs1Reader = new gs1js.GS1Reader(code);

  console.log(JSON.stringify(gs1Reader.getApplicationIdentifiers()));
  const batchNumber = gs1Reader.getApplicationIdentifierById(
    GS1Identifier.BatchNumber
  )?.value;
  const expirationDate = parseGs1ExpirationDate(
    gs1Reader.getApplicationIdentifierById(GS1Identifier.ExpirationDate)?.value
  );
  const gtin = gs1Reader.getApplicationIdentifierById(
    GS1Identifier.GTIN
  )?.value;
  const serialNumber = gs1Reader.getApplicationIdentifierById(
    GS1Identifier.SerialNumber
  )?.value;

  return { batchNumber, expirationDate, gtin, serialNumber };
};

// GS1 stores expiration date in the following format: YYMMDD
const parseGs1ExpirationDate = (expirationDateString) => {
  if (!expirationDateString || expirationDateString.length !== 6) {
    return undefined;
  }

  const currentYearPrefix = new Date().getFullYear().toString().substring(0, 2);

  const year = `${currentYearPrefix}${expirationDateString.substring(0, 2)}`;
  const month = expirationDateString.substring(2, 4);
  const day = expirationDateString.substring(4, 6);

  const dateString = `${year}-${month}-${day}T00:00:00.000Z`;
  const date = new Date(dateString);

  if (date.toString() === "Invalid Date") {
    return undefined;
  }

  return date;
};
