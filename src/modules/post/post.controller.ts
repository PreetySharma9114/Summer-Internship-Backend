import { NextFunction, Request, Response } from "express";
import { PostService } from "./post.service.js";
import { ResponseUtil } from "../../shared/utils/response.util.js";
import { logger } from "../../shared/utils/logger.js";

const postService = new PostService();

export const PostController = {
  generateCaption: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await postService.generateCampaignCaption(
        req.body.userText,
        req.file!,
      );

      return ResponseUtil.success(
        res,
        result,
        "Caption generated successfully",
      );
    } catch (error) {
      next(error);
    }
  },

  refineCaption: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await postService.refineCampaignCaption(
        req.body.caption,
        req.body.instruction,
      );

      return ResponseUtil.success(res, result, "Caption refined successfully");
    } catch (error) {
      next(error);
    }
  },

  submitPost: async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.info(req.user);
      await postService.submitCampaignPost(req.user!.id, req.body);

      return ResponseUtil.success(
        res,
        {},
        "Instagram media successfully uploaded.",
      );
    } catch (error) {
      next(error);
    }
  },
};
