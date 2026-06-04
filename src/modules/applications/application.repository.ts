import { ApplicationStatus } from "../../common/enums/application-status.enum.js";
import { Application } from "./application.model.js";

export class ApplicationRepository {
  create = async (data: object) => {
    return Application.create(data);
  };

  findByInfluencerAndCampaign = async (
    influencerId: string,
    campaignId: string,
  ) => {
    return Application.findOne({
      influencerId,
      campaignId,
    });
  };

  findByCampaignId = async (campaignId: string) => {
    return Application.find({
      campaignId,
    })
      .populate("influencerId")
      .populate("campaignId");
  };

  findByInfluencerId = async (influencerId: string) => {
    return Application.find({
      influencerId,
    }).populate("campaignId");
  };

  findById = async (id: string) => {
    return Application.findById(id);
  };

  updateStatus = async (id: string, status: ApplicationStatus) => {
    return Application.findByIdAndUpdate(
      id,
      {
        status,
      },
      {
        new: true,
      },
    );
  };
}
