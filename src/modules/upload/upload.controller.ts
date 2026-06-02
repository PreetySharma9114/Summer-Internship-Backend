import { Request, Response } from "express";

import { ResponseUtil } from "../../shared/utils/response.util.js";

import { UploadService } from "./upload.service.js";

export class UploadController {
  static async upload(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const result = UploadService.uploadFile(
      req.file!,
    );

    return ResponseUtil.success(
      res,
      result,
      "File uploaded successfully",
    );
  }
}