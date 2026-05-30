import { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";

import { env } from "../../config/env.js";

import { UnauthorizedError } from "../utils/appError.js";

export interface JwtPayload {
  id: string;

  email: string;

  role: string;
}

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthorizedError("Unauthorized");
  }

  const token = authHeader.split(" ")[1];

  const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;

  req.user = decoded;

  next();
};
