import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class InfluencerProfileDto {
  @IsString()
  @IsNotEmpty()
  fullName!: string;

  @IsString()
  @IsNotEmpty()
  username!: string;

  @IsString()
  @IsNotEmpty()
  bio!: string;

  @IsString()
  @IsNotEmpty()
  niche!: string;

  @IsString()
  @IsOptional()
  instagramUsername?: string;

  @IsString()
  @IsOptional()
  youtubeUsername?: string;

  @IsOptional()
  instagramFollowers?: number;

  @IsOptional()
  youtubeFollowers?: number;
  @IsString()
  @IsOptional()
  profileImage?: string;
}
