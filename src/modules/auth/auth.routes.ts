import { Router } from "express";

import { AuthController } from "./auth.controller.js";

import {
  registerDto,
  verifyOtpDto,
  resendOtpDto,
  createPasswordDto,
  loginDto,
} from "./dto/auth.dto.js";

import { validate } from "../../shared/middlewares/validation.middleware.js";

export const AuthRouter = Router();

AuthRouter.post(
  "/register",
  validate(registerDto),
  AuthController.register,
);

AuthRouter.post(
  "/verify-otp",
  validate(verifyOtpDto),
  AuthController.verifyOtp,
);

AuthRouter.post(
  "/resend-otp",
  validate(resendOtpDto),
  AuthController.resendOtp,
);

AuthRouter.post(
  "/create-password",
  validate(createPasswordDto),
  AuthController.createPassword,
);

AuthRouter.post(
  "/login",
  validate(loginDto),
  AuthController.login,
);
