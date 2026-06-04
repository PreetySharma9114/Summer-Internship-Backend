import { Profile } from "./models/profile.model.js";
import { InfluencerProfile } from "./models/influencer-profile.model.js";
import { BrandProfile } from "./models/brand-profile.model.js";
import {
  InfluencerProfileDto,
  BrandProfileDto,
} from "./dto/profile.dto.js";
import { UserRole } from "../../common/enums/user-role.enum.js";

export class ProfileRepository {
  async upsertInfluencerProfile(userId: string, data: InfluencerProfileDto) {
    return InfluencerProfile.findOneAndUpdate(
      { userId },
      {
        ...data,
        profileType: UserRole.INFLUENCER,
      },
      {
        upsert: true,
        returnDocument: "after",
      },
    );
  }

  async upsertBrandProfile(userId: string, data: BrandProfileDto) {
    return BrandProfile.findOneAndUpdate(
      { userId },
      {
        ...data,
        profileType: UserRole.BRAND,
      },
      {
        upsert: true,
        returnDocument: "after",
      },
    );
  }

  findByUserId = async (userId: string) => {
    return Profile.findOne({
      userId,
    });
  };
}
