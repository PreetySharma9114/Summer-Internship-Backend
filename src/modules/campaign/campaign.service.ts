import { AppError } from "../../shared/utils/appError.js";

import { CampaignRepository } from "./campaign.repository.js";

import { CreateCampaignDto, UpdateCampaignDto } from "./dto/campaign.dto.js";

export class CampaignService {
  private campaignRepository = new CampaignRepository();

  createCampaign = async (userId: string, data: CreateCampaignDto) => {
    return this.campaignRepository.create({
      ...data,
      brandId: userId,
    });
  };

  getCampaigns = async () => {
    return this.campaignRepository.findAll();
  };

  getBrandCampaigns = async (userId: string) => {
    return this.campaignRepository.findByBrandId(userId);
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
