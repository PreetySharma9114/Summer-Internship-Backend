import z from "zod";

export const generateCaptionDto = z.object({
  userText: z.string().optional(),
});

export type GenerateCaptionDto = z.infer<typeof generateCaptionDto>;

export const refineCaptionDto = z.object({
  caption: z.string().min(1),
  instruction: z.string().min(1),
});

export type RefineCaptionDto = z.infer<typeof refineCaptionDto>;

export const submitCampaignPostDto = z
  .object({
    caption: z.string().min(1),
    imageUrl: z.string().optional(),
    videoUrl: z.string().optional(),
  })
  .refine((data) => !!data.imageUrl || !!data.videoUrl, {
    message: "Either imageUrl or videoUrl is required.",
    path: ["imageUrl"],
  });

export type SubmitCampaignPostDto = z.infer<typeof submitCampaignPostDto>;
