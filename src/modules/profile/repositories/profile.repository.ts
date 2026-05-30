import { Profile }
from '../profile.model.js';

export class ProfileRepository {

  static async upsertInfluencerProfile(
    userId: string,
    data: object,
  ) {

    return Profile.findOneAndUpdate(
      {
        userId,
      },
      {
        ...data,

        profileType:
          'INFLUENCER',
      },
      {
        new: true,

        upsert: true,
      },
    );
  }

  static async upsertBrandProfile(
    userId: string,
    data: object,
  ) {

    return Profile.findOneAndUpdate(
      {
        userId,
      },
      {
        ...data,

        profileType:
          'BRAND',
      },
      {
        new: true,

        upsert: true,
      },
    );
  }
}