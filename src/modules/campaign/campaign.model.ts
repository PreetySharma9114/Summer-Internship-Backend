import mongoose, { Document, Schema, Types } from "mongoose";
import { Industry } from "../../common/enums/industry.enum.js";
import { Platform } from "../../common/enums/platform.enum.js";
import { CampaignStatus } from "../../common/enums/campaign-status.enum.js";
export interface ICampaign extends Document {
  brandId: Types.ObjectId;
  title: string;
  description: string;
  category: Industry;
  platforms: Platform[];
  budgetPerInfluencer: number;
  totalSlots: number;
  filledSlots: number;
  startDate: Date;
  endDate: Date;
  status: CampaignStatus;
}
const campaignSchema = new Schema<ICampaign>(
  {
    brandId: {
      type: Schema.Types.ObjectId,
      ref: "User",
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
    },

    category: {
      type: String,
      enum: Object.values(Industry),
      required: true,
    },

    platforms: [
      {
        type: String,
        enum: Object.values(Platform),
      },
    ],

    budgetPerInfluencer: {
      type: Number,
      required: true,
      min: 0,
    },

    totalSlots: {
      type: Number,
      required: true,
      min: 1,
    },

    filledSlots: {
      type: Number,
      default: 0,
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: Object.values(CampaignStatus),
      default: CampaignStatus.ACTIVE,
    },
  },
  {
    timestamps: true,
  },
);
campaignSchema.pre("save", function () {
  if (this.endDate <= this.startDate) {
    throw new Error("End date must be greater than start date");
  }
});
export const Campaign = mongoose.model<ICampaign>(
  "Campaign",

  campaignSchema,
);
