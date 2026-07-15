import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
} from "../../shared/utils/appError.js";
import { CampaignRepository } from "./campaign.repository.js";
import { ProfileRepository } from "../profile/profile.repository.js";
import { CreateCampaignDto, UpdateCampaignDto } from "./dto/campaign.dto.js";

export class CampaignService {
  private campaignRepository = new CampaignRepository();
  private profileRepository = new ProfileRepository();

  createCampaign = async (userId: string, data: CreateCampaignDto) => {
    const profile = await this.profileRepository.findByUserId(userId);

    if (!profile) {
      throw new NotFoundError("Profile not found");
    }

    return this.campaignRepository.create({
      ...data,
      brandId: profile._id,
    });
  };

  getCampaigns = async () => {
    return this.campaignRepository.findAll();
  };

  getBrandCampaigns = async (userId: string) => {
    const profile = await this.profileRepository.findByUserId(userId);

    if (!profile) {
      throw new NotFoundError("Profile not found");
    }

    return this.campaignRepository.findByBrandId(profile._id.toString());
  };
  getCampaignById = async (campaignId: string) => {
    const campaign = await this.campaignRepository.findById(campaignId);

    if (!campaign) {
      throw new NotFoundError("Campaign not found");
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
      throw new NotFoundError("Campaign not found");
    }

    const profile = await this.profileRepository.findByUserId(userId);

    if (!profile) {
      throw new NotFoundError("Profile not found");
    }

    if (campaign.brandId.toString() !== profile._id.toString()) {
      throw new ForbiddenError("Unauthorized");
    }

    const startDate = data.startDate
      ? new Date(data.startDate)
      : campaign.startDate;

    const endDate = data.endDate ? new Date(data.endDate) : campaign.endDate;

    if (endDate <= startDate) {
      throw new BadRequestError("End date must be greater than start date");
    }

    return this.campaignRepository.updateById(campaignId, data);
  };

  deleteCampaign = async (campaignId: string, userId: string) => {
    const campaign = await this.campaignRepository.findById(campaignId);

    if (!campaign) {
      throw new NotFoundError("Campaign not found");
    }

    const profile = await this.profileRepository.findByUserId(userId);

    if (!profile) {
      throw new NotFoundError("Profile not found");
    }

    if (campaign.brandId.toString() !== profile._id.toString()) {
      throw new ForbiddenError("Unauthorized");
    }

    await this.campaignRepository.deleteById(campaignId);
  };
}
