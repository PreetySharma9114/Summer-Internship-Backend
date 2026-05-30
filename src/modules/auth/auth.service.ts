import {
  ConflictError,
  NotFoundError,
  ForbiddenError,
} from "../../shared/utils/appError.js";

import bcrypt from "bcryptjs";

import { UserRepository } from "../user/user.repository.js";

import {
  RegisterDto,
  VerifyOtpDto,
  CreatePasswordDto,
  LoginDto,
} from "./dto/auth.dto.js";

import { generateOtp } from "../../shared/utils/otp.js";

import { generateToken } from "../../shared/utils/jwt.js";

export class AuthService {
  private userRepo = new UserRepository();

  register = async (data: RegisterDto) => {
    const existingUser = await this.userRepo.findByEmail(data.email);

    if (existingUser) {
      throw new ConflictError("User already exists");
    }

    const otp = generateOtp();

    const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000);

    const user = await this.userRepo.create({
      ...data,

      otp,

      otpExpiresAt,
    });

    console.log(`OTP: ${otp}`);

    return {
      message: "OTP sent successfully",

      id: String(user._id),

      isOtpVerified: user.isOtpVerified,

      profileStatus: user.profileStatus,
    };
  };

  verifyOtp = async (data: VerifyOtpDto) => {
    const user = await this.userRepo.findById(data.id);
    console.log(user?.otp,data.otp)
    if (!user) {
      throw new NotFoundError("User not found");
    }

    if (!user.otp || user.otp !== data.otp) {
      throw new ConflictError("Invalid OTP");
    }

    if (user.otpExpiresAt && user.otpExpiresAt < new Date()) {
      throw new ForbiddenError("OTP expired");
    }

    await this.userRepo.update(String(user._id), {
      isOtpVerified: true,

      otp: undefined,

      otpExpiresAt: undefined,
    });

    return {
      success: true,

      message: "OTP verified successfully",
    };
  };

  createPassword = async (data: CreatePasswordDto) => {
    const user = await this.userRepo.findById(data.id);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    if (!user.isOtpVerified) {
      throw new ConflictError("Email not verified");
    }

    if (user.password) {
      throw new ConflictError("Password already exists");
    }

    const hashedPassword = await bcrypt.hash(data.password, 12);

    await this.userRepo.update(String(user._id), {
      password: hashedPassword,
    });

    return {
      message: "Password created successfully",
    };
  };

  login = async (data: LoginDto) => {
    const user = await this.userRepo.findByEmail(data.email);

    if (!user) {
      throw new NotFoundError("Invalid credentials");
    }

    if (!user.isOtpVerified) {
      throw new ConflictError("Email not verified");
    }

    if (!user.password) {
      throw new ConflictError("Password not created");
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) {
      throw new NotFoundError("Invalid credentials");
    }

    const token = generateToken(String(user._id), user.email, user.role);

    const userObject = user.toObject();

    delete userObject.password;

    return {
      token,

      user: {
        id: String(userObject._id),

        email: userObject.email,

        role: userObject.role,

        profileStatus: userObject.profileStatus,
      },
    };
  };

  resendOtp = async (id: string) => {
    const user = await this.userRepo.findById(id);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    const otp = generateOtp();

    const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await this.userRepo.update(String(user._id), {
      otp,
      otpExpiresAt,
    });

    console.log("Resend OTP:", otp);

    return {
      succes: true,
      message: "OTP resent successfully",
    };
  };
}
