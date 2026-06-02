import { Router } from "express";

import { authenticate } from "../../shared/middlewares/auth.middleware.js";

import { upload } from "../../shared/middlewares/upload.middleware.js";

import { UploadController } from "./upload.controller.js";

export const UploadRouter = Router();

UploadRouter.post(
  "/",
  authenticate,
  upload.single("file"),
  UploadController.upload,
);