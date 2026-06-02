import { plainToInstance } from "class-transformer";

import { validate } from "class-validator";

import { NextFunction, Request, Response } from "express";

export const validateDto =
  <T extends object>(dtoClass: new () => T) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const dtoObject = plainToInstance(dtoClass, req.body);
    const errors = await validate(dtoObject, {
      whitelist: true,

      forbidNonWhitelisted: true,
    });

    if (errors.length > 0) {
      res.status(400).json({
        success: false,

        errors: errors.map((error) => ({
          field: error.property,

          errors: Object.values(error.constraints || {}),
        })),
      });

      return;
    }
    if (!req.body) {
      res.status(400).json({
        success: false,
        message: "Request body is required",
      });

      return;
    }
    req.body = dtoObject;

    next();
  };
