export const GeolocationErrorType = Object.freeze({
  PermissionDenied: 1,
  PositionUnavailable,
  Timeout,
  Unknown,
});

export class GeolocationError extends Error {
  constructor(type, message) {
    super(message);

    switch (type) {
      case 1:
        this.type = GeolocationErrorType.PermissionDenied;
        break;
      case 2:
        this.type = GeolocationErrorType.PositionUnavailable;
        break;
      case 3:
        this.type = GeolocationErrorType.Timeout;
        break;
      default:
        this.type = GeolocationErrorType.Unknown;
        break;
    }
  }
}
