import jwt from "jsonwebtoken";
import { AuthException } from "../exceptions/auth.exception.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      throw AuthException.tokenMissing();
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (error) {
    // If it's already one of our custom exceptions, pass it through
    if (error.errorCode) {
      return next(error);
    }
    // JWT-specific errors
    if (error.name === "TokenExpiredError") {
      return next(AuthException.tokenExpired());
    }
    return next(AuthException.tokenInvalid());
  }
};
