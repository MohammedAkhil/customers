export default class ApiError extends Error {
  constructor({ message = 'Unknown', status, ...errorObject }) {
    super(message);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }

    this.name = 'ApiError';
    this.message = message;
    this.errorObject = errorObject;
    this.status = status;
  }
}
