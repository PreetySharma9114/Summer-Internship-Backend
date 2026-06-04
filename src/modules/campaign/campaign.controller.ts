import { Request, Response, NextFunction } from "express";

import { CampaignService } from "./campaign.service.js";

import { ResponseUtil } from "../../shared/utils/response.util.js";

const campaignService = new CampaignService();

export const CampaignController = {
  createCampaign: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const campaign = await campaignService.createCampaign(
        req.user!.id,
        req.body,
      );

      return ResponseUtil.success(
        res,
        campaign,
        "Campaign created successfully",
        201,
      );
    } catch (error) {
      next(error);
    }
  },

  getCampaigns: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const campaigns = await campaignService.getCampaigns();

      return ResponseUtil.success(
        res,
        campaigns,
        "Campaigns fetched successfully",
      );
    } catch (error) {
      next(error);
    }
  },

  getMyCampaigns: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const campaigns = await campaignService.getBrandCampaigns(req.user!.id);

      return ResponseUtil.success(
        res,
        campaigns,
        "Campaigns fetched successfully",
      );
    } catch (error) {
      next(error);
    }
  },
  getCampaignById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const campaignId = req.params.id as string;

      const campaign = await campaignService.getCampaignById(campaignId);

      return ResponseUtil.success(
        res,
        campaign,
        "Campaign fetched successfully",
      );
    } catch (error) {
      next(error);
    }
  },
  updateCampaign: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const campaignId = req.params.id as string;

      const campaign = await campaignService.updateCampaign(
        campaignId,
        req.user!.id,
        req.body,
      );

      return ResponseUtil.success(
        res,
        campaign,
        "Campaign updated successfully",
      );
    } catch (error) {
      next(error);
    }
  },
  deleteCampaign: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const campaignId = req.params.id as string;

      await campaignService.deleteCampaign(campaignId, req.user!.id);

      return ResponseUtil.success(res, null, "Campaign deleted successfully");
    } catch (error) {
      next(error);
    }
  },
};
