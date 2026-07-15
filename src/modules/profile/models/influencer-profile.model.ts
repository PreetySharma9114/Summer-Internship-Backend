import { Schema } from "mongoose";
import { Profile } from "./profile.model.js";
import { IInfluencerProfile } from "../interfaces/influencer-profile.interface.js";

export const InfluencerProfile = Profile.discriminator(
  "INFLUENCER",
  new Schema<IInfluencerProfile>({
    fullName: {
      type: String,
      required: true,
    },

    username: {
      type: String,
      required: true,
    },

    bio: {
      type: String,
      required: true,
    },

    niches: [
      {
        type: String,
        required: true,
      },
    ],

    instagramToken: {
      type: String,
      required: true,
      select: false,
    },

    instagramUserId: {
      type: String,
      required: true,
      select: false,
    },

    instagramUsername: {
      type: String,
      required: true,
    },

    instagramFollowers: {
      type: Number,
      required: true,
    },

    youtubeUsername: String,

    youtubeFollowers: Number,

    profileImage: String,
  }),
);
