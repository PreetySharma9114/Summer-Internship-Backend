import { ApplicationStatus } from "../../common/enums/application-status.enum.js";
import { UserRole } from "../../common/enums/user-role.enum.js";

import { AppError } from "../../shared/utils/appError.js";

import { UserRepository } from "../user/user.repository.js";
import { CampaignRepository } from "../campaign/campaign.repository.js";
import { ApplicationRepository } from "./application.repository.js";
import { ProfileRepository } from "../profile/profile.repository.js";

export class ApplicationService {
  private applicationRepository = new ApplicationRepository();

  private campaignRepository = new CampaignRepository();

  private userRepository = new UserRepository();

  private profileRepository = new ProfileRepository();

  applyToCampaign = async (userId: string, campaignId: string) => {
    const user = await this.userRepository.findById(userId);

    if (!user || user.role !== UserRole.INFLUENCER) {
      throw new AppError("Only influencers can apply", 403);
    }

    const profile = await this.profileRepository.findByUserId(userId);

    if (!profile) {
      throw new AppError("Profile not found", 404);
    }

    const campaign = await this.campaignRepository.findById(campaignId);

    if (!campaign) {
      throw new AppError("Campaign not found", 404);
    }

    if (campaign.brandId.toString() === userId) {
      throw new AppError("Cannot apply to your own campaign", 400);
    }

    const existingApplication =
      await this.applicationRepository.findByInfluencerAndCampaign(
        profile.id,
        campaignId,
      );

    if (existingApplication) {
      throw new AppError("Already applied to this campaign", 409);
    }

    return this.applicationRepository.create({
      influencerId: profile.id,
      campaignId,
      status: ApplicationStatus.PENDING,
    });
  };

  getCampaignApplications = async (campaignId: string, userId: string) => {
    console.log("campaignId:", campaignId);

    console.log("userId:", userId);
    const campaign = await this.campaignRepository.findById(campaignId);

    if (!campaign) {
      throw new AppError("Campaign not found", 404);
    }

    if (campaign.brandId.toString() !== userId) {
      throw new AppError("Unauthorized", 403);
    }

    return this.applicationRepository.findByCampaignId(campaignId);
  };

  getMyApplications = async (userId: string) => {
    const profile = await this.profileRepository.findByUserId(userId);

    if (!profile) {
      throw new AppError("Profile not found", 404);
    }

    return this.applicationRepository.findByInfluencerId(profile.id);
  };

  updateApplicationStatus = async (
    applicationId: string,
    status: ApplicationStatus,
    userId: string,
  ) => {
    const application =
      await this.applicationRepository.findById(applicationId);

    if (!application) {
      throw new AppError("Application not found", 404);
    }

    const campaign = await this.campaignRepository.findById(
      application.campaignId.toString(),
    );

    if (!campaign) {
      throw new AppError("Campaign not found", 404);
    }

    if (campaign.brandId.toString() !== userId) {
      throw new AppError("Unauthorized", 403);
    }

    if (application.status === status) {
      throw new AppError(`Application already ${status.toLowerCase()}`, 400);
    }

    if (status === ApplicationStatus.ACCEPTED) {
      if (campaign.filledSlots >= campaign.totalSlots) {
        throw new AppError("Campaign is already full", 400);
      }

      const updatedCampaign =
        await this.campaignRepository.incrementFilledSlots(campaign.id);

      if (
        updatedCampaign &&
        updatedCampaign.filledSlots >= updatedCampaign.totalSlots
      ) {
        await this.campaignRepository.closeCampaign(campaign.id);
      }
    }

    return this.applicationRepository.updateStatus(applicationId, status);
  };
}
