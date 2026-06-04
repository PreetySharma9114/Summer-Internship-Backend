import { Router } from "express";

import { authenticate } from "../../shared/middlewares/auth.middleware.js";

import { validate } from "../../shared/middlewares/validation.middleware.js";

import { ApplicationController } from "./application.controller.js";

import { updateApplicationStatusSchema } from "./dto/application.dto.js";

export const ApplicationRouter = Router();

ApplicationRouter.get(
  "/my",
  authenticate,
  ApplicationController.getMyApplications,
);

ApplicationRouter.patch(
  "/:id/status",
  authenticate,
  validate(updateApplicationStatusSchema),
  ApplicationController.updateApplicationStatus,
);
