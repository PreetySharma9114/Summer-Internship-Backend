import { z } from "zod";

import { UserRole } from "../../../common/enums/user-role.enum.js";

export const registerDto = z.object({
  email: z.email(),

  role: z.nativeEnum(UserRole),
});

export type RegisterDto = z.infer<typeof registerDto>;

export const verifyOtpDto = z.object({
  id: z.string(),

  otp: z.string().length(6),
});

export type VerifyOtpDto = z.infer<typeof verifyOtpDto>;

export const createPasswordDto = z
  .object({
    id: z.string(),

    password: z
      .string()
      .min(8)
      .regex(/[A-Z]/, "One uppercase required")
      .regex(/[a-z]/, "One lowercase required")
      .regex(/[0-9]/, "One number required")
      .regex(/[@$!%*?&]/, "One special character required"),

    confirmPassword: z.string(),
  })
  .refine(
    (data) => data.password === data.confirmPassword,
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    },
  );

export type CreatePasswordDto = z.infer<typeof createPasswordDto>;

export const loginDto = z.object({
  email: z.email(),

  password: z.string(),
});

export type LoginDto = z.infer<typeof loginDto>;

export const resendOtpDto = z.object({
  id: z.string(),
});

export type ResendOtpDto = z.infer<typeof resendOtpDto>;