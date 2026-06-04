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

CampaignRouter.post(
  "/",
  authenticate,
  validate(createCampaignSchema),
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
  validate(updateCampaignSchema),
  CampaignController.updateCampaign,
);
CampaignRouter.delete("/:id", authenticate, CampaignController.deleteCampaign);
CampaignRouter.get(
  "/:campaignId/applications",
  authenticate,
  ApplicationController.getCampaignApplications,
);
