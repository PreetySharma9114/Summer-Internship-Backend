import { IsNotEmpty, IsString } from "class-validator";

export class VerifyOtpDto {
  @IsString()
  @IsNotEmpty()
  id!: string;

  @IsString()
  @IsNotEmpty()
  otp!: string;
}
