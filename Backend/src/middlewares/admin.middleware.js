import { AuthException } from "../exceptions/auth.exception.js";

export const checkAdmin = async (req, res, next) => {
  try {
    const Role = req.user?.role;

    if (Role !== "ADMIN") {
      throw AuthException.forbidden();
    }

    next();
  } catch (error) {
    next(error);
  }
};