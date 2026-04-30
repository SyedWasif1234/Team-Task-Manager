import { Router } from "express";

import authController from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const authRouter = Router();

authRouter.post("/login", (req, res, next) =>
  authController.login(req, res, next)
);

authRouter.post("/register", (req, res, next) =>
  authController.signup(req, res, next)
);

authRouter.post("/logout", authMiddleware, (req, res, next) =>
  authController.logout(req, res, next)
);

authRouter.get("/check-Auth", authMiddleware, (req, res, next) =>
  authController.checkAuth(req, res, next)
);

authRouter.post("/forgot-password", (req, res, next) =>
  authController.forgotPassword(req, res, next)
);

authRouter.post("/reset-password", (req, res, next) =>
  authController.resetPassword(req, res, next)
);

export default authRouter;
