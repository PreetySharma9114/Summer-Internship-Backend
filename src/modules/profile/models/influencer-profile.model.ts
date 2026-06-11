import { Schema } from "mongoose";

import { Profile } from "./profile.model.js";
export const InfluencerProfile = Profile.discriminator(
  "INFLUENCER",
  new Schema({
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

    instagramUsername: String,

    instagramFollowers: Number,

    youtubeUsername: String,

    youtubeFollowers: Number,

    profileImage: String,
  }),
);
