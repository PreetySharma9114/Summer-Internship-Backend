import { Router } from "express";
import { CampaignController } from "./campaign.controller.js";
import { authenticate } from "../../shared/middlewares/auth.middleware.js";
import { authorize } from "../../shared/middlewares/role.middleware.js";
import { validate } from "../../shared/middlewares/validation.middleware.js";
import {
  createCampaignSchema,
  updateCampaignSchema,
} from "./dto/campaign.dto.js";
import { UserRole } from "../../common/enums/user-role.enum.js";

export const CampaignRouter = Router();

CampaignRouter.use(authenticate);
CampaignRouter.post(
  "/",
  authorize(UserRole.BRAND),
  validate(createCampaignSchema),
  CampaignController.createCampaign,
);

CampaignRouter.get(
  "/",
  CampaignController.getCampaigns,
);

CampaignRouter.get(
  "/my",
  authorize(UserRole.BRAND),
  CampaignController.getMyCampaigns,
);

CampaignRouter.get(
  "/:id",
  CampaignController.getCampaignById,
);

CampaignRouter.patch(
  "/:id",
  authorize(UserRole.BRAND),
  validate(updateCampaignSchema),
  CampaignController.updateCampaign,
);

CampaignRouter.delete(
  "/:id",
  authorize(UserRole.BRAND),
  CampaignController.deleteCampaign,
);

