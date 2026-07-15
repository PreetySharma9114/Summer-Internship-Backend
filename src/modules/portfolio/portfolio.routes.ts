import { Router } from "express";

import { PortfolioController } from "./portfolio.controller.js";

import { authenticate } from "../../shared/middlewares/auth.middleware.js";
import { authorize } from "../../shared/middlewares/role.middleware.js";
import { validate } from "../../shared/middlewares/validation.middleware.js";

import {
  createPortfolioSchema,
  updatePortfolioSchema,
} from "./dto/portfolio.dto.js";

import { UserRole } from "../../common/enums/user-role.enum.js";

export const PortfolioRouter = Router();

PortfolioRouter.get(
  "/profile/:profileId",
  PortfolioController.getPortfolioByProfile,
);

PortfolioRouter.use(authenticate);

PortfolioRouter.post(
  "/",
  authorize(UserRole.INFLUENCER),
  validate(createPortfolioSchema),
  PortfolioController.createPortfolio,
);

PortfolioRouter.get(
  "/my",
  authorize(UserRole.INFLUENCER),
  PortfolioController.getMyPortfolio,
);

PortfolioRouter.patch(
  "/:id",
  authorize(UserRole.INFLUENCER),
  validate(updatePortfolioSchema),
  PortfolioController.updatePortfolio,
);

PortfolioRouter.delete(
  "/:id",
  authorize(UserRole.INFLUENCER),
  PortfolioController.deletePortfolio,
);