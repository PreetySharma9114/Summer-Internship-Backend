import { Request, Response, NextFunction } from "express";
import { ResponseUtil } from "../../shared/utils/response.util.js";
import { AuthService } from "./auth.service.js";
const authService = new AuthService();
export const AuthController = {
  register: async (
    req: Request,

    res: Response,

    next: NextFunction,
  ) => {
    try {
      const result = await authService.register(req.body);

      return ResponseUtil.success(res, result, "OTP sent successfully", 201);
    } catch (error) {
      next(error);
    }
  },
  verifyOtp: async (
    req: Request,

    res: Response,

    next: NextFunction,
  ) => {
    try {
      const result = await authService.verifyOtp(req.body);

      return ResponseUtil.success(res, result, "OTP verified successfully");
    } catch (error) {
      next(error);
    }
  },
  createPassword: async (
    req: Request,

    res: Response,

    next: NextFunction,
  ) => {
    try {
      const result = await authService.createPassword(req.body);

      return ResponseUtil.success(res, result, "Password created successfully");
    } catch (error) {
      next(error);
    }
  },
  login: async (
    req: Request,

    res: Response,

    next: NextFunction,
  ) => {
    try {
      const result = await authService.login(req.body);

      return ResponseUtil.success(res, result, "Login successful");
    } catch (error) {
      next(error);
    }
  },
  resendOtp: async (
    req: Request,

    res: Response,

    next: NextFunction,
  ) => {
    try {
      const result = await authService.resendOtp(req.body.id);

      return ResponseUtil.success(res, result, "OTP resent successfully");
    } catch (error) {
      next(error);
    }
  },
};
