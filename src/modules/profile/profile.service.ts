import { ProfileStatus } from "../../common/enums/profile-status.enum.js";
import { InfluencerProfileDto, BrandProfileDto } from "./dto/profile.dto.js";
import { UserRepository } from "../user/user.repository.js";

import { ProfileRepository } from "./profile.repository.js";

import { NotFoundError } from "../../shared/utils/appError.js";

export class ProfileService {
  private profileRepo = new ProfileRepository();

  private userRepository = new UserRepository();

  completeInfluencerProfile = async (
    userId: string,
    data: InfluencerProfileDto,
  ) => {
    const profile = await this.profileRepo.upsertInfluencerProfile(userId, {
      ...data,
    });

    await this.userRepository.updateProfileStatus(
      userId,
      ProfileStatus.COMPLETE,
    );

    return profile;
  };

  completeBrandProfile = async (
    userId: string,
    data: BrandProfileDto,
  ) => {
    const profile = await this.profileRepo.upsertBrandProfile(userId, {
      ...data,
    });

    await this.userRepository.updateProfileStatus(
      userId,
      ProfileStatus.COMPLETE,
    );

    return profile;
  };

  // NEW
  getInfluencerProfile = async (profileId: string) => {
    const profile = await this.profileRepo.findById(profileId);

    if (!profile) {
      throw new NotFoundError("Influencer profile not found");
    }

    return profile;
  };
}