import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "../../shared/utils/apiResponse.js";
import { InstagramExchangeDto } from "./instagram.dto.js";
import { InstagramService } from "./instagram.service.js";
import { ResponseUtil } from "../../shared/utils/response.util.js";

const instagramService = new InstagramService();

export const InstagramController = {
  exchange: async (
    req: Request<unknown, unknown, InstagramExchangeDto>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const result = await instagramService.exchange(req.body.code);

      return ResponseUtil.success(res, result);
    } catch (error) {
      next(error);
    }
  },
};