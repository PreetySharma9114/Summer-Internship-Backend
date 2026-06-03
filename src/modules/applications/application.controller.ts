import { Request, Response, NextFunction } from "express";

import { ApplicationService } from "./application.service.js";

import { ResponseUtil } from "../../shared/utils/response.util.js";

const applicationService = new ApplicationService();

export const ApplicationController = {
  applyToCampaign: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const campaignId = req.params.campaignId as string;

      const application = await applicationService.applyToCampaign(
        req.user.id,
        campaignId,
      );

      return ResponseUtil.success(
        res,
        application,
        "Applied successfully",
        201,
      );
    } catch (error) {
      next(error);
    }
  },

  getCampaignApplications: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const campaignId = req.params.campaignId as string;

      const applications =
        await applicationService.getCampaignApplications(campaignId, req.user.id);
      return ResponseUtil.success(
        res,
        applications,
        "Applications fetched successfully",
      );
    } catch (error) {
      next(error);
    }
  },

  getMyApplications: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const applications = await applicationService.getMyApplications(
        req.user.id,
      );

      return ResponseUtil.success(
        res,
        applications,
        "Applications fetched successfully",
      );
    } catch (error) {
      next(error);
    }
  },

  updateApplicationStatus: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const applicationId = req.params.id as string;

      const application = await applicationService.updateApplicationStatus(
        applicationId,
        req.body.status,
        req.user.id,
      );
      
      return ResponseUtil.success(
        res,
        application,
        "Application updated successfully",
      );
    } catch (error) {
      next(error);
    }
  },
};
