export const NetworkErrorType = Object.freeze({
  Fetch: "The network request failed",
  JsonDecoding: "Unable to decode JSON",
  JsonParsing: "Unable to parse JSON",
  StatusCode: "Server responded with not successfull status code",
  TimeOut: "The network request timed out",
});

export class NetworkError extends Error {
  constructor(type, detail) {
    super(type);
    this.type = type;
    detail && (this.message += `: ${detail}`);
  }
}
