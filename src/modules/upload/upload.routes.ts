import { Router } from "express";

import { authenticate } from "../../shared/middlewares/auth.middleware.js";
import { authorize } from "../../shared/middlewares/role.middleware.js";
import { upload } from "../../shared/middlewares/upload.middleware.js";

import { UploadController } from "./upload.controller.js";

import { UserRole } from "../../common/enums/user-role.enum.js";

export const UploadRouter = Router();

UploadRouter.use(authenticate);

UploadRouter.post(
  "/",
  upload.single("file"),
  UploadController.upload,
);

UploadRouter.post(
  "/portfolio",
  authorize(UserRole.INFLUENCER),
  upload.single("portfolio"),
  UploadController.uploadPortfolio,
);

UploadRouter.post(
  "/post",
  authorize(UserRole.INFLUENCER),
  upload.single("post"),
  UploadController.uploadPortfolio,
);