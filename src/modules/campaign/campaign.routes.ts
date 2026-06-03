import { Router } from "express";

import { CampaignController } from "./campaign.controller.js";

import { authenticate } from "../../shared/middlewares/auth.middleware.js";

import { validateDto } from "../../shared/middlewares/validation.middleware.js";

import { CreateCampaignDto } from "./dto/create-campaign.dto.js";
import { ApplicationController } from "../applications/application.controller.js";
import { UpdateCampaignDto } from "./dto/update-campaigns.dto.js";
export const CampaignRouter = Router();

CampaignRouter.post(
  "/",
  authenticate,
  validateDto(CreateCampaignDto),
  CampaignController.createCampaign,
);

CampaignRouter.get("/", authenticate, CampaignController.getCampaigns);

CampaignRouter.get("/my", authenticate, CampaignController.getMyCampaigns);
CampaignRouter.post(
  "/:campaignId/apply",
  authenticate,
  ApplicationController.applyToCampaign,
);
CampaignRouter.get("/:id", authenticate, CampaignController.getCampaignById);
CampaignRouter.patch(
  "/:id",
  authenticate,
  validateDto(UpdateCampaignDto),
  CampaignController.updateCampaign,
);
CampaignRouter.delete("/:id", authenticate, CampaignController.deleteCampaign);
CampaignRouter.get(
  "/:campaignId/applications",
  authenticate,
  ApplicationController.getCampaignApplications,
);
