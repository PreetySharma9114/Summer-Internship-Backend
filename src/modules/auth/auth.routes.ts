import { Router } from "express";

import { AuthController } from "./auth.controller.js";

import { RegisterDto } from "./dto/register.dto.js";

import { VerifyOtpDto } from "./dto/verify-otp.dto.js";

import { ResendOtpDto } from "./dto/resend-otp.dto.js";

import { CreatePasswordDto } from "./dto/create-password.dto.js";

import { LoginDto } from "./dto/login.dto.js";

import { validateDto } from "../../shared/middlewares/validation.middleware.js";

export const AuthRouter = Router();

AuthRouter.post(
  "/register",

  validateDto(RegisterDto),

  AuthController.register,
);

AuthRouter.post(
  "/verify-otp",

  validateDto(VerifyOtpDto),

  AuthController.verifyOtp,
);

AuthRouter.post(
  "/resend-otp",

  validateDto(ResendOtpDto),

  AuthController.resendOtp,
);

AuthRouter.post(
  "/create-password",

  validateDto(CreatePasswordDto),

  AuthController.createPassword,
);

AuthRouter.post(
  "/login",

  validateDto(LoginDto),

  AuthController.login,
);
