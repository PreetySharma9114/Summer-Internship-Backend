import { Router } from "express";

import { authenticate } from "../../shared/middlewares/auth.middleware.js";

import { validateDto } from "../../shared/middlewares/validation.middleware.js";

import { UpdateApplicationStatusDto } from "./dto/update-application-status.dto.js";

import { ApplicationController } from "./application.controller.js";

export const ApplicationRouter = Router();

ApplicationRouter.get(
  "/my",
  authenticate,
  ApplicationController.getMyApplications,
);

ApplicationRouter.patch(
  "/:id/status",
  authenticate,
  validateDto(UpdateApplicationStatusDto),
  ApplicationController.updateApplicationStatus,
);
