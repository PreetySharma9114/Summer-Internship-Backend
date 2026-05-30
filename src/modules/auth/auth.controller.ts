import { Request, Response, NextFunction } from "express";

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

      return res.status(201).json(result);
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

      return res.status(200).json(result);
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

      return res.status(200).json(result);
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

      return res.status(200).json(result);
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

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },
};
