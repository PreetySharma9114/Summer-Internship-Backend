import mongoose, { Document, Schema, Types } from "mongoose";
import { ApplicationStatus } from "../../common/enums/application-status.enum.js";

export interface IApplication extends Document {
  influencerId: Types.ObjectId;
  campaignId: Types.ObjectId;
  status: ApplicationStatus;
}

const applicationSchema = new Schema<IApplication>({
  influencerId: {
    type: Schema.Types.ObjectId,
    ref: "Profile",
    required: true,
  },
  campaignId: {
    type: Schema.Types.ObjectId,
    ref: "Campaign",
    required: true,
  },
  status: {
    type: String,
    enum: Object.values(ApplicationStatus),
    default: ApplicationStatus.PENDING,
  },
});
applicationSchema.index(
  {
    influencerId: 1,
    campaignId: 1,
  },
  {
    unique: true,
  },
);
export const Application = mongoose.model<IApplication>(
  "Application",
  applicationSchema,
);
