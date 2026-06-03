import { Profile } from "./models/profile.model.js";

import { UserRole } from "../../common/enums/user-role.enum.js";

export class ProfileRepository {
  async upsertInfluencerProfile(userId: string, data: object) {
    return Profile.findOneAndUpdate(
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

  async upsertBrandProfile(userId: string, data: object) {
    return Profile.findOneAndUpdate(
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
