import mongoose, { Document, Schema } from "mongoose";

import { UserRole } from "../../common/enums/user-role.enum.js";

import { ProfileStatus } from "../../common/enums/profile-status.enum.js";
export interface IUser extends Document {
  email: string;

  role: UserRole;

  isOtpVerified: boolean;
  profileStatus: ProfileStatus;
  otp?: string;

  otpExpiresAt?: Date;

  password?: string;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,

      required: true,

      unique: true,

      lowercase: true,

      trim: true,
    },

    role: {
      type: String,

      enum: Object.values(UserRole),

      required: true,
    },

    isOtpVerified: {
      type: Boolean,

      default: false,
    },

    profileStatus: {
      type: String,

      enum: Object.values(ProfileStatus),

      default: ProfileStatus.INCOMPLETE,
    },

    otp: {
      type: String,
    },

    otpExpiresAt: {
      type: Date,
    },

    password: {
      type: String,
    },
  },

  {
    timestamps: true,
  },
);

export const User = mongoose.model<IUser>(
  "User",

  userSchema,
);
