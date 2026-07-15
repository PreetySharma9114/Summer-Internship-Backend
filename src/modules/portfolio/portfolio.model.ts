import mongoose, { Document, Schema } from "mongoose";

import { MediaType } from "../../common/enums/media-type.enum.js";
import { SocialPlatform } from "../../common/enums/social-platform.enum.js";
import { env } from "../../config/env.js";

const BASE_URL = env.APP_URL;

export interface IPortfolio extends Document {
  profileId: mongoose.Types.ObjectId;

  title: string;

  description: string;

  mediaUrl: string;

  thumbnailUrl: string;

  mediaType: MediaType;

  platform: SocialPlatform;

  hashtags: string[];
}

const portfolioSchema = new Schema<IPortfolio>(
  {
    profileId: {
      type: Schema.Types.ObjectId,

      ref: "Profile",

      required: true,
    },

    title: {
      type: String,

      required: true,

      trim: true,
    },

    description: {
      type: String,

      required: true,

      trim: true,
    },

    mediaUrl: {
      type: String,

      required: true,
    },

    thumbnailUrl: {
      type: String,

      required: true,
    },

    mediaType: {
      type: String,

      enum: Object.values(MediaType),

      required: true,
    },

    platform: {
      type: String,

      enum: Object.values(SocialPlatform),

      required: true,
    },

    hashtags: [
      {
        type: String,

        trim: true,
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  },
);

portfolioSchema.virtual("mediaFullUrl").get(function () {
  return `${env.APP_URL}${this.mediaUrl}`;
});

portfolioSchema.virtual("thumbnailFullUrl").get(function () {
  return `${env.APP_URL}${this.thumbnailUrl}`;
});

export const Portfolio = mongoose.model<IPortfolio>(
  "Portfolio",
  portfolioSchema,
);
