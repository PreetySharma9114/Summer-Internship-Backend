import { InfluencerProfile } from "../models/influencer-profile.model.js";
import { BrandProfile } from "../models/brand-profile.model.js";
export class ProfileRepository {
  async upsertInfluencerProfile(userId: string, data: object) {
    return InfluencerProfile.findOneAndUpdate(
      {
        userId,
      },
      {
        ...data,
      },
      {
        new: true,
        upsert: true,
      },
    );
  }

  async upsertBrandProfile(userId: string, data: object) {
    return BrandProfile.findOneAndUpdate(
      {
        userId,
      },
      {
        ...data,
      },
      {
        new: true,
        upsert: true,
      },
    );
  }
}
