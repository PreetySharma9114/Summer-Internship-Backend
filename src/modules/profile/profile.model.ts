import mongoose, { Document, Schema } from "mongoose";

import { Industry } from "../../common/enums/industry.enum.js";

export interface IProfile extends Document {
  userId: mongoose.Types.ObjectId;

  profileType: "INFLUENCER" | "BRAND";

  // Influencer
  fullName?: string;

  username?: string;

  bio?: string;

  niche?: string;

  instagramUsername?: string;

  youtubeUsername?: string;

  followersCount?: number;

  profileImage?: string;

  // Brand
  brandName?: string;

  website?: string;

  description?: string;

  industry?: Industry;

  logo?: string;
}

const profileSchema = new Schema<IProfile>(
  {
    userId: {
      type: Schema.Types.ObjectId,

      ref: "User",

      required: true,

      unique: true,
    },

    profileType: {
      type: String,

      enum: ["INFLUENCER", "BRAND"],

      required: true,
    },

    // Influencer fields
    fullName: {
      type: String,
    },

    username: {
      type: String,
    },

    bio: {
      type: String,
    },

    niche: {
      type: String,
    },

    instagramUsername: {
      type: String,
    },

    youtubeUsername: {
      type: String,
    },

    followersCount: {
      type: Number,
    },

    profileImage: {
      type: String,
    },

    // Brand fields
    brandName: {
      type: String,
    },

    website: {
      type: String,
    },

    description: {
      type: String,
    },

    industry: {
      type: String,

      enum: Object.values(Industry),
    },

    logo: {
      type: String,
    },
  },

  {
    timestamps: true,
  },
);

export const Profile = mongoose.model<IProfile>(
  "Profile",
  profileSchema,
);