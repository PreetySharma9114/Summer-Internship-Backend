import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from "class-validator";

import { Industry } from "../../../common/enums/industry.enum.js";
import { Platform } from "../../../common/enums/platform.enum.js";

export class CreateCampaignDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsEnum(Industry)
  category!: Industry;

  @IsArray()
  @IsEnum(Platform, {
    each: true,
  })
  platforms!: Platform[];

  @IsNumber()
  budgetPerInfluencer!: number;

  @IsNumber()
  totalSlots!: number;

  @IsDateString()
  startDate!: string;

  @IsDateString()
  endDate!: string;
}
