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
   getMedia: async (

    req: Request,

    res: Response,

    next: NextFunction,

  ) => {

    try {

      const after =

        typeof req.query.after === "string"

          ? req.query.after

          : undefined;

      const limit =

        typeof req.query.limit === "string"

          ? Number(req.query.limit)

          : undefined;

      const result = await instagramService.getMedia(

        req.user!.id,

        {

          after,

          limit,

        },

      );

      ApiResponse.success(res, result);

    } catch (error) {

      next(error);

    }

  },
};