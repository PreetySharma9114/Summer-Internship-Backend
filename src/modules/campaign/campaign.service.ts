import { UserRole } from "../../common/enums/user-role.enum.js";

import { AppError } from "../../shared/utils/appError.js";

import { UserRepository } from "../user/user.repository.js";

import { CampaignRepository } from "./campaign.repository.js";

import { CreateCampaignDto } from "./dto/create-campaign.dto.js";
import { UpdateCampaignDto } from "./dto/update-campaigns.dto.js";

export class CampaignService {
  private campaignRepository = new CampaignRepository();

  private userRepository = new UserRepository();

  createCampaign = async (brandId: string, data: CreateCampaignDto) => {
    const user = await this.userRepository.findById(brandId);

    if (!user || user.role !== UserRole.BRAND) {
      throw new AppError("Only brands can create campaigns", 403);
    }

    return this.campaignRepository.create({
      ...data,
      brandId,
    });
  };

  getCampaigns = async () => {
    return this.campaignRepository.findAll();
  };

  getBrandCampaigns = async (brandId: string) => {
    return this.campaignRepository.findByBrandId(brandId);
  };
  getCampaignById = async (campaignId: string) => {
    const campaign = await this.campaignRepository.findById(campaignId);

    if (!campaign) {
      throw new AppError("Campaign not found", 404);
    }

    return campaign;
  };
  updateCampaign = async (
    campaignId: string,
    userId: string,
    data: UpdateCampaignDto,
  ) => {
    const campaign = await this.campaignRepository.findById(campaignId);

    if (!campaign) {
      throw new AppError("Campaign not found", 404);
    }

    if (campaign.brandId.toString() !== userId) {
      throw new AppError("Unauthorized", 403);
    }
    const startDate = data.startDate
      ? new Date(data.startDate)
      : campaign.startDate;

    const endDate = data.endDate ? new Date(data.endDate) : campaign.endDate;

    if (endDate <= startDate) {
      throw new AppError("End date must be greater than start date", 400);
    }
    return this.campaignRepository.updateById(campaignId, data);
  };
  deleteCampaign = async (campaignId: string, userId: string) => {
    const campaign = await this.campaignRepository.findById(campaignId);

    if (!campaign) {
      throw new AppError("Campaign not found", 404);
    }

    if (campaign.brandId.toString() !== userId) {
      throw new AppError("Unauthorized", 403);
    }

    await this.campaignRepository.deleteById(campaignId);
  };
}
