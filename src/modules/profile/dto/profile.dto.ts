import { z } from "zod";
import { Industry } from "../../../common/enums/industry.enum.js";
export const influencerProfileSchema = z.object({
  fullName: z.string().min(1),

  username: z.string().min(1),

  bio: z.string().min(1),

  niches: z.array(z.string()).min(1),
  instagramUsername: z.string().optional(),

  youtubeUsername: z.string().optional(),

  instagramFollowers: z.number().optional(),

  youtubeFollowers: z.number().optional(),

  profileImage: z.string().optional(),
});

export type InfluencerProfileDto = z.infer<typeof influencerProfileSchema>;

export const brandProfileSchema = z.object({
  brandName: z.string().min(1),

  website: z.string().min(1),

  description: z.string().min(1),

  industry: z.nativeEnum(Industry),

  instagramUsername: z.string().optional(),

  logo: z.string().optional(),
});

export type BrandProfileDto = z.infer<typeof brandProfileSchema>;
