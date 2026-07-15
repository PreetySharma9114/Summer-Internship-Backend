import OpenAI from "openai";

import { env } from "../../config/env.js";
import { ConflictError, NotFoundError } from "../../shared/utils/appError.js";
import { InstagramService } from "../instagram/instagram.service.js";
import { IInfluencerProfile } from "../profile/interfaces/influencer-profile.interface.js";
import { ProfileRepository } from "../profile/profile.repository.js";
import { PostAIService } from "./post.ai.service.js";
import { SubmitCampaignPostDto } from "./post.dto.js";
import { logger } from "../../shared/utils/logger.js";

export class PostService {
  private influencerProfileRepo = new ProfileRepository();
  private instagramService = new InstagramService();

  private aiService = new PostAIService();

  private openai = new OpenAI({
    apiKey: env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
  });

  generateCampaignCaption = async (
    userText: string | undefined,
    file: Express.Multer.File,
  ) => {
    const result = await this.aiService.generateCaption(userText, file);

    return result;
  };

  refineCampaignCaption = async (caption: string, instruction: string) => {
    const result = await this.aiService.refineCaption(caption, instruction);

    return result;
  };

  submitCampaignPost = async (userId: string, data: SubmitCampaignPostDto) => {
    const profile = (await this.influencerProfileRepo.findByUserId(
      userId,
      "+instagramToken +instagramUserId",
    )) as IInfluencerProfile | null;

    if (!profile) throw new NotFoundError("Influencer profile not found");

    logger.info(profile);

    if (!profile.instagramToken || !profile.instagramUserId) {
      throw new ConflictError("Instagram account not connected");
    }

    const media = await this.instagramService.publishMedia(
      profile.instagramToken,
      profile.instagramUserId,
      {
        caption: data.caption,
        imageUrl: data.imageUrl ? `${env.APP_URL}${data.imageUrl}` : undefined,
        videoUrl: data.videoUrl ? `${env.APP_URL}${data.videoUrl}` : undefined,
      },
    );
  };
}
