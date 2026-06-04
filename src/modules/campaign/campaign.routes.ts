import { Router } from "express";

import { CampaignController } from "./campaign.controller.js";
import { validate } from "../../shared/middlewares/validation.middleware.js";

import {
  createCampaignSchema,
  updateCampaignSchema,
} from "./dto/campaign.dto.js";

import { authenticate } from "../../shared/middlewares/auth.middleware.js";

import { ApplicationController } from "../applications/application.controller.js";

export const CampaignRouter = Router();

CampaignRouter.use(authenticate);

CampaignRouter.post(
  "/",
  validate(createCampaignSchema),
  CampaignController.createCampaign,
);

CampaignRouter.get("/", CampaignController.getCampaigns);

CampaignRouter.get("/my", CampaignController.getMyCampaigns);

CampaignRouter.post(
  "/:campaignId/apply",
  ApplicationController.applyToCampaign,
);

CampaignRouter.get(
  "/:campaignId/applications",
  ApplicationController.getCampaignApplications,
);

CampaignRouter.get("/:id", CampaignController.getCampaignById);

CampaignRouter.patch(
  "/:id",
  validate(updateCampaignSchema),
  CampaignController.updateCampaign,
);

CampaignRouter.delete("/:id", CampaignController.deleteCampaign);
