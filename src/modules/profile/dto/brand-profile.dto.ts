import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

import { Industry } from "../../../common/enums/industry.enum.js";

export class BrandProfileDto {
  @IsString()
  @IsNotEmpty()
  brandName!: string;

  @IsString()
  @IsNotEmpty()
  website!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsEnum(Industry)
  industry!: Industry;

  @IsString()
  @IsOptional()
  instagramUsername?: string;
}
