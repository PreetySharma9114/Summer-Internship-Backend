import { Router } from "express";
import { PostController } from "./post.controller.js";
import {
  generateCaptionDto,
  refineCaptionDto,
  submitCampaignPostDto,
} from "./post.dto.js";
import { validate } from "../../shared/middlewares/validation.middleware.js";
import { upload } from "../../shared/middlewares/upload.middleware.js";

export const PostRouter = Router();

PostRouter.post(
  "/caption",
  upload.single("post"),
  validate(generateCaptionDto),
  PostController.generateCaption,
);

PostRouter.patch(
  "/caption",
  validate(refineCaptionDto),
  PostController.refineCaption,
);

PostRouter.post(
  "/",
  validate(submitCampaignPostDto),
  PostController.submitPost,
);
