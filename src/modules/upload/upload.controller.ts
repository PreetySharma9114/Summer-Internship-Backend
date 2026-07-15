import { Request, Response, NextFunction } from "express";

import { ResponseUtil } from "../../shared/utils/response.util.js";
import { UploadService } from "./upload.service.js";

export class UploadController {
  static async upload(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      if (!req.file) {
        throw new Error("No file uploaded");
      }

      const result = await UploadService.uploadFile(req.file);

      ResponseUtil.success(res, result, "File uploaded successfully");
    } catch (error) {
      next(error);
    }
  }

  static async uploadPortfolio(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      if (!req.file) {
        throw new Error("No file uploaded");
      }

      const result = await UploadService.uploadPortfolio(req.file);

      ResponseUtil.success(res, result, "Portfolio uploaded successfully");
    } catch (error) {
      next(error);
    }
  }

  static async uploadPost(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      if (!req.file) {
        throw new Error("No file uploaded");
      }

      const result = await UploadService.uploadFile(req.file);

      ResponseUtil.success(res, result, "File uploaded successfully");
    } catch (error) {
      next(error);
    }
  }
}
