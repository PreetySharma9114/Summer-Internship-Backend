import { Request, Response } from "express";

import { ProfileService } from "./profile.service.js";
import { ResponseUtil } from "../../shared/utils/response.util.js";

export class ProfileController {
  static async completeInfluencerProfile(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const userId = req.user.id;
    const profileImage = req.file?.path;

    const profile = await ProfileService.completeInfluencerProfile(
      userId,
      req.body,
      profileImage,
    );

    return ResponseUtil.success(res, profile, "Influencer profile completed");
  }

  static async completeBrandProfile(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const userId = req.user.id;
    const logo = req.file?.path;

    const profile = await ProfileService.completeBrandProfile(
      userId,
      req.body,
      logo,
    );

    return ResponseUtil.success(res, profile, "Brand profile completed");
  }
}
