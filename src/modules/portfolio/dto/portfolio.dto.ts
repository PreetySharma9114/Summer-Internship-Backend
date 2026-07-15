import { z } from "zod";
import { MediaType } from "../../../common/enums/media-type.enum.js";
import { SocialPlatform } from "../../../common/enums/social-platform.enum.js";

export const createPortfolioSchema = z.object({
  title: z.string().trim().min(2).max(100),

  description: z.string().trim().min(5).max(1000),

  mediaUrl: z.string().min(1),

  thumbnailUrl: z.string().min(1),

  mediaType: z.enum(MediaType),

  platform: z.enum(SocialPlatform),

  hashtags: z.array(z.string()).default([]),
});

export type CreatePortfolioDto = z.infer<typeof createPortfolioSchema>;

export const updatePortfolioSchema = createPortfolioSchema.partial();

export type UpdatePortfolioDto = z.infer<typeof updatePortfolioSchema>;
