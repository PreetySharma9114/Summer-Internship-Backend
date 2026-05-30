import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class ResendOtpDto {

  @IsString()
  @IsNotEmpty()
  id!: string;
}