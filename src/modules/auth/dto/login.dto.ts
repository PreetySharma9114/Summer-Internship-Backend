import { IsEmail, IsEnum, IsString, MinLength } from "class-validator";

import { UserRole }
from '../../../common/enums/user-role.enum.js';
export class LoginDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(6)
  password!: string;

}
