import { Request, Response, NextFunction } from "express";

import { UserRole } from "../../common/enums/user-role.enum.js";
import { AppError } from "../utils/appError.js";

export const authorize =
  (...roles: UserRole[]) =>
  (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError("Unauthorized", 401));
    }

    if (!roles.includes(req.user.role)) {
      return next(new AppError("Forbidden", 403));
    }

    next();
  };
