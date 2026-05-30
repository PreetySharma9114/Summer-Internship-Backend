import { IsEmail, IsEnum } from "class-validator";

import { UserRole } from "../../../common/enums/user-role.enum.js";

export class RegisterDto {
  @IsEmail()
  email!: string;

  @IsEnum(UserRole)
  role!: UserRole;
}
