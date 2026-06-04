import { z } from "zod";

import { Industry } from "../../../common/enums/industry.enum.js";
import { Platform } from "../../../common/enums/platform.enum.js";

const campaignBaseSchema = z.object({
  title: z.string().min(1),

  description: z.string().min(1),

  category: z.nativeEnum(Industry),

  platforms: z.array(z.nativeEnum(Platform)),

  budgetPerInfluencer: z.number().positive(),

  totalSlots: z.number().min(1),

  startDate: z.string(),

  endDate: z.string(),
});

export const createCampaignSchema = campaignBaseSchema.refine(
  (data) => new Date(data.endDate) > new Date(data.startDate),
  {
    message: "End date must be greater than start date",
    path: ["endDate"],
  },
);

export type CreateCampaignDto = z.infer<typeof createCampaignSchema>;

export const updateCampaignSchema = campaignBaseSchema.partial();

export type UpdateCampaignDto = z.infer<typeof updateCampaignSchema>;
