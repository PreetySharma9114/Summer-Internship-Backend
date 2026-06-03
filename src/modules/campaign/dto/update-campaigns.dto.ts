import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

import { Industry } from "../../../common/enums/industry.enum.js";

import { Platform } from "../../../common/enums/platform.enum.js";

export class UpdateCampaignDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(Industry)
  category?: Industry;

  @IsOptional()
  @IsArray()
  @IsEnum(Platform, {
    each: true,
  })
  platforms?: Platform[];

  @IsOptional()
  @IsNumber()
  budgetPerInfluencer?: number;

  @IsOptional()
  @IsNumber()
  totalSlots?: number;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;
}