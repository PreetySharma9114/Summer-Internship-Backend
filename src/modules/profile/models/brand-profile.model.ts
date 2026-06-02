import { Schema } from "mongoose";

import { Industry } from "../../../common/enums/industry.enum.js";

import { Profile } from "./profile.model.js";
export const BrandProfile = Profile.discriminator(
  "BRAND",
  new Schema({
    brandName: {
      type: String,
      required: true,
    },

    website: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    industry: {
      type: String,
      enum: Object.values(Industry),
      required: true,
    },

    instagramUsername: String,

    logo: String,
  }),
);
