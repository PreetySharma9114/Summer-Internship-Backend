import { Router } from "express";

import { ProfileController } from "./profile.controller.js";

import { validateDto } from "../../shared/middlewares/validation.middleware.js";

import { InfluencerProfileDto } from "./dto/influencer-profile.dto.js";
import { authenticate } from "../../shared/middlewares/auth.middleware.js";
import { BrandProfileDto } from "./dto/brand-profile.dto.js";

export const ProfileRouter = Router();

ProfileRouter.post(
  "/influencer",

  authenticate,

  validateDto(
    InfluencerProfileDto,
  ),

  ProfileController.completeInfluencerProfile,
);
ProfileRouter.post(
  "/brand",

  authenticate,

  validateDto(
    BrandProfileDto,
  ),

  ProfileController.completeBrandProfile,
);