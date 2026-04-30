import { BaseException } from '../exceptions/BaseException.js';

// Express knows this is an error handler because it has exactly 4 parameters
export const errorHandler = (err, req, res, next) => {
  console.error(`[Error]: ${err.message}`);

  // Handle our custom expected errors
  if (err instanceof BaseException) {
    return res.status(err.status).json({
      success: false,
      errorCode: err.errorCode,
      message: err.message,
    });
  }

  // Handle unexpected/system errors
  return res.status(500).json({
    success: false,
    errorCode: 'SYS_500',
    message: 'An unexpected internal server error occurred',
    // Only leak stack traces in development
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};