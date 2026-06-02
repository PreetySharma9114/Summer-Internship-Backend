import mongoose, { Schema } from "mongoose";

import { UserRole } from "../../../common/enums/user-role.enum.js";

import { IProfile } from "../interfaces/profile.interface.js";

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
      enum: Object.values(UserRole),
    },
  },
  {
    timestamps: true,
    discriminatorKey: "profileType",
  },
);

export const Profile = mongoose.model<IProfile>("Profile", profileSchema);
