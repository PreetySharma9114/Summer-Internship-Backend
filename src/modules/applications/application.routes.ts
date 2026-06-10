import { Router } from "express";

import { authenticate } from "../../shared/middlewares/auth.middleware.js";
import { validate } from "../../shared/middlewares/validation.middleware.js";

import { ApplicationController } from "./application.controller.js";

import { updateApplicationStatusSchema } from "./dto/application.dto.js";

export const ApplicationRouter = Router();

ApplicationRouter.use(authenticate);

ApplicationRouter.post(
  "/campaigns/:campaignId/apply",
  ApplicationController.applyToCampaign,
);

ApplicationRouter.get(
  "/campaigns/:campaignId",
  ApplicationController.getCampaignApplications,
);

ApplicationRouter.get(
  "/my",
  ApplicationController.getMyApplications,
);

ApplicationRouter.patch(
  "/:id/status",
  validate(updateApplicationStatusSchema),
  ApplicationController.updateApplicationStatus,
);