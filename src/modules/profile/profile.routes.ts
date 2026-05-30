import { Router } from "express";

import { ProfileController } from "./profile.controller.js";

import { validateDto } from "../../shared/middlewares/validation.middleware.js";

import { InfluencerProfileDto } from "./dto/influencer-profile.dto.js";
import { authenticate } from "../../shared/middlewares/auth.middleware.js";
import { BrandProfileDto } from "./dto/brand-profile.dto.js";
import { upload } from "../../shared/middlewares/upload.middleware.js";
export const ProfileRouter = Router();

ProfileRouter.post(
  "/influencer",

  authenticate,

  upload.single("profileImage"),

  validateDto(
    InfluencerProfileDto,
  ),

  ProfileController.completeInfluencerProfile,
);
ProfileRouter.post(
  "/brand",

  authenticate,

  upload.single("logo"),

  validateDto(
    BrandProfileDto,
  ),

  ProfileController.completeBrandProfile,
);