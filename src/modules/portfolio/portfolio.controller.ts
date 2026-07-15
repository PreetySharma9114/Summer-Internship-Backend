import { Request, Response, NextFunction } from "express";

import { ResponseUtil } from "../../shared/utils/response.util.js";
import { PortfolioService } from "./portfolio.service.js";

const portfolioService = new PortfolioService();
type IdParams = {
  id: string;
};

type ProfileParams = {
  profileId: string;
};
export const PortfolioController = {
  createPortfolio: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await portfolioService.createPortfolio(
        req.user!.id,
        req.body,
      );

      return ResponseUtil.success(
        res,
        result,
        "Portfolio created successfully",
        201,
      );
    } catch (error) {
      next(error);
    }
  },

  getMyPortfolio: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await portfolioService.getMyPortfolio(req.user!.id);

      return ResponseUtil.success(
        res,
        result,
        "Portfolio fetched successfully",
      );
    } catch (error) {
      next(error);
    }
  },

  getPortfolioByProfile: async (
    req: Request<ProfileParams>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const result = await portfolioService.getPortfolioByProfile(
        req.params.profileId,
      );

      return ResponseUtil.success(
        res,
        result,
        "Portfolio fetched successfully",
      );
    } catch (error) {
      next(error);
    }
  },

  updatePortfolio: async (
    req: Request<IdParams>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const result = await portfolioService.updatePortfolio(
        req.params.id,
        req.user!.id,
        req.body,
      );

      return ResponseUtil.success(
        res,
        result,
        "Portfolio updated successfully",
      );
    } catch (error) {
      next(error);
    }
  },

  deletePortfolio: async (
    req: Request<IdParams>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      await portfolioService.deletePortfolio(req.params.id, req.user!.id);

      return ResponseUtil.success(res, null, "Portfolio deleted successfully");
    } catch (error) {
      next(error);
    }
  },
};
