export class BaseException extends Error {
  constructor(errorConfig, message) {
    // If no custom message is provided, fall back to the config's default message
    super(message || errorConfig.message);
    
    this.errorCode = errorConfig.code;
    this.status = errorConfig.status;
    
    // Capture the stack trace for debugging, excluding the constructor call from it
    Error.captureStackTrace(this, this.constructor);
  }
}