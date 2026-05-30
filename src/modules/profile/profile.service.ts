import { ProfileStatus } from '../../common/enums/profile-status.enum.js';

import { InfluencerProfileDto } from './dto/influencer-profile.dto.js';

import { BrandProfileDto } from './dto/brand-profile.dto.js';

import { UserRepository } from '../user/user.repository.js';

import { ProfileRepository } from './repositories/profile.repository.js';

export class ProfileService {

  private static userRepository =
    new UserRepository();

  static async completeInfluencerProfile(
    userId: string,
    data: InfluencerProfileDto,
    profileImage?: string,
  ) {

    const profile =
      await ProfileRepository.upsertInfluencerProfile(
        userId,
        {
          ...data,
          profileImage,
        },
      );

    await this.userRepository
      .updateProfileStatus(
        userId,
        ProfileStatus.COMPLETE,
      );

    return profile;
  }

  static async completeBrandProfile(
    userId: string,
    data: BrandProfileDto,
    logo?: string,
  ) {

    const profile =
      await ProfileRepository.upsertBrandProfile(
        userId,
        {
          ...data,
          logo,
        },
      );

    await this.userRepository
      .updateProfileStatus(
        userId,
        ProfileStatus.COMPLETE,
      );

    return profile;
  }
}