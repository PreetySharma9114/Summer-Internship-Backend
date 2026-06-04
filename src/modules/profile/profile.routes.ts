import { Router } from "express";

import { ProfileController } from "./profile.controller.js";

import { authenticate } from "../../shared/middlewares/auth.middleware.js";

import { validate } from "../../shared/middlewares/validation.middleware.js";

import {
  influencerProfileSchema,
  brandProfileSchema,
} from "./dto/profile.dto.js";

export const ProfileRouter = Router();

ProfileRouter.use(authenticate);

ProfileRouter.post(
  "/influencer",
  validate(influencerProfileSchema),
  ProfileController.completeInfluencerProfile,
);

ProfileRouter.post(
  "/brand",
  validate(brandProfileSchema),
  ProfileController.completeBrandProfile,
);