import jwt from "jsonwebtoken";

import { env } from "../../config/env.js";

import { UserRole } from "../../common/enums/user-role.enum.js";
export const generateToken = (
  id: string,

  email: string,

  role: UserRole,
): string => {
  return jwt.sign(
    {
      id,
      email,
      role,
    },

    env.JWT_SECRET,

    {
      expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"],
    },
  );
};
