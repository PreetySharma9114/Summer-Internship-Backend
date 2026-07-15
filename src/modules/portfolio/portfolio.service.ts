import {
  ForbiddenError,
  NotFoundError,
} from "../../shared/utils/appError.js";

import { PortfolioRepository } from "./portfolio.repository.js";
import { ProfileRepository } from "../profile/profile.repository.js";

import {
  CreatePortfolioDto,
  UpdatePortfolioDto,
} from "./dto/portfolio.dto.js";

export class PortfolioService {
  private portfolioRepository = new PortfolioRepository();

  private profileRepository = new ProfileRepository();

  createPortfolio = async (
    userId: string,
    data: CreatePortfolioDto,
  ) => {
    const profile = await this.profileRepository.findByUserId(userId);

    if (!profile) {
      throw new NotFoundError("Profile not found");
    }

    return this.portfolioRepository.create({
      ...data,
      profileId: profile._id,
    });
  };

  getMyPortfolio = async (userId: string) => {
    const profile = await this.profileRepository.findByUserId(userId);

    if (!profile) {
      throw new NotFoundError("Profile not found");
    }

    return this.portfolioRepository.findByProfileId(
      profile._id.toString(),
    );
  };

  getPortfolioByProfile = async (profileId: string) => {
    return this.portfolioRepository.findByProfileId(profileId);
  };

  updatePortfolio = async (
    portfolioId: string,
    userId: string,
    data: UpdatePortfolioDto,
  ) => {
    const portfolio =
      await this.portfolioRepository.findById(portfolioId);

    if (!portfolio) {
      throw new NotFoundError("Portfolio not found");
    }

    const profile = await this.profileRepository.findByUserId(userId);

    if (!profile) {
      throw new NotFoundError("Profile not found");
    }

    if (
      portfolio.profileId.toString() !==
      profile._id.toString()
    ) {
      throw new ForbiddenError(
        "You are not allowed to update this portfolio item",
      );
    }

    return this.portfolioRepository.update(
      portfolioId,
      data,
    );
  };

  deletePortfolio = async (
    portfolioId: string,
    userId: string,
  ) => {
    const portfolio =
      await this.portfolioRepository.findById(portfolioId);

    if (!portfolio) {
      throw new NotFoundError("Portfolio not found");
    }

    const profile = await this.profileRepository.findByUserId(userId);

    if (!profile) {
      throw new NotFoundError("Profile not found");
    }

    if (
      portfolio.profileId.toString() !==
      profile._id.toString()
    ) {
      throw new ForbiddenError(
        "You are not allowed to delete this portfolio item",
      );
    }

    await this.portfolioRepository.delete(portfolioId);
  };
}