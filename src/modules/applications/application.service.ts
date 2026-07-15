import { ApplicationStatus } from "../../common/enums/application-status.enum.js";
import { UserRole } from "../../common/enums/user-role.enum.js";

import {
  ConflictError,
  ForbiddenError,
  NotFoundError,
} from "../../shared/utils/appError.js";

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
      throw new ForbiddenError("Only influencers can apply");
    }

    const profile = await this.profileRepository.findByUserId(userId);

    if (!profile) {
      throw new NotFoundError("Profile not found");
    }

    const campaign = await this.campaignRepository.findById(campaignId);

    if (!campaign) {
      throw new NotFoundError("Campaign not found");
    }

    const brandProfile = await this.profileRepository.findByUserId(userId);

    if (
      brandProfile &&
      campaign.brandId.toString() === brandProfile._id.toString()
    ) {
      throw new ForbiddenError("Cannot apply to your own campaign");
    }

    const existingApplication =
      await this.applicationRepository.findByInfluencerAndCampaign(
        profile.id,
        campaignId,
      );

    if (existingApplication) {
      throw new ConflictError("Already applied to this campaign");
    }

    return this.applicationRepository.create({
      influencerId: profile.id,
      campaignId,
      status: ApplicationStatus.PENDING,
    });
  };

  getCampaignApplications = async (campaignId: string, userId: string) => {
    const campaign = await this.campaignRepository.findById(campaignId);

    if (!campaign) {
      throw new NotFoundError("Campaign not found");
    }

    const profile = await this.profileRepository.findByUserId(userId);

    if (!profile) {
      throw new NotFoundError("Profile not found");
    }

    if (campaign.brandId._id.toString() !== profile._id.toString()) {
      throw new ForbiddenError("Unauthorized");
    }

    return this.applicationRepository.findByCampaignId(campaignId);
  };

  getMyApplications = async (userId: string) => {
    const profile = await this.profileRepository.findByUserId(userId);

    if (!profile) {
      throw new NotFoundError("Profile not found");
    }

    return this.applicationRepository.findByInfluencerId(profile.id);
  };

  updateApplicationStatus = async (
    applicationId: string,
    brandId: string,
    status: ApplicationStatus,
  ) => {
    const application =
      await this.applicationRepository.findById(applicationId);

    if (!application) {
      throw new NotFoundError("Application not found");
    }

    const campaign = await this.campaignRepository.findById(
      String(application.campaignId),
    );

    if (!campaign) {
      throw new NotFoundError("Campaign not found");
    }

    const profile = await this.profileRepository.findByUserId(brandId);

    if (!profile) {
      throw new NotFoundError("Profile not found");
    }

    if (campaign.brandId.toString() !== profile._id.toString()) {
      throw new ForbiddenError("Unauthorized");
    }

    application.status = status;

    await application.save();

    return application;
  };
}
