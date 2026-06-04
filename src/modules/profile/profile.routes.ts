import { Router } from "express";

import { ProfileController } from "./profile.controller.js";

import { authenticate } from "../../shared/middlewares/auth.middleware.js";

import { validate } from "../../shared/middlewares/validation.middleware.js";

import {
  influencerProfileSchema,
  brandProfileSchema,
} from "./dto/profile.dto.js";

export const ProfileRouter = Router();

ProfileRouter.post(
  "/influencer",
  authenticate,
  validate(influencerProfileSchema),
  ProfileController.completeInfluencerProfile,
);

ProfileRouter.post(
  "/brand",
  authenticate,
  validate(brandProfileSchema),
  ProfileController.completeBrandProfile,
);
