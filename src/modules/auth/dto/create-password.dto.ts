import {
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class CreatePasswordDto {

  @IsString()
  @IsNotEmpty()
  id!: string;

  @IsString()
  @MinLength(6)
  password!: string;

  @IsString()
  @MinLength(6)
  confirmPassword!: string;
}