import mongoose, { Document, Schema } from "mongoose";

export interface IProfile extends Document {
  userId: mongoose.Types.ObjectId;
  profileType: "INFLUENCER" | "BRAND";
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
      required: true,
      enum: ["INFLUENCER", "BRAND"],
    },
  },
  {
    timestamps: true,
    discriminatorKey: "profileType",
  },
);

export const Profile = mongoose.model<IProfile>("Profile", profileSchema);
