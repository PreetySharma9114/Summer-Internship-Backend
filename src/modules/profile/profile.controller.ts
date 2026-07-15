import { Request, Response, NextFunction } from "express";

import { ProfileService } from "./profile.service.js";

import { ResponseUtil } from "../../shared/utils/response.util.js";

const profileService = new ProfileService();

export const ProfileController = {
  completeInfluencerProfile: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const profile = await profileService.completeInfluencerProfile(
        req.user!.id,
        req.body,
      );

      return ResponseUtil.success(
        res,
        profile,
        "Influencer profile completed",
      );
    } catch (error) {
      next(error);
    }
  },

  completeBrandProfile: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const profile = await profileService.completeBrandProfile(
        req.user!.id,
        req.body,
      );

      return ResponseUtil.success(
        res,
        profile,
        "Brand profile completed",
      );
    } catch (error) {
      next(error);
    }
  },

  // NEW
  getInfluencerProfile: async (
    req: Request<{ profileId: string }>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const profile = await profileService.getInfluencerProfile(
        req.params.profileId,
      );

      return ResponseUtil.success(
        res,
        profile,
        "Influencer profile fetched successfully",
      );
    } catch (error) {
      next(error);
    }
  },
};