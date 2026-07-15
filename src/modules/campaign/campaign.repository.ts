import { CampaignStatus } from "../../common/enums/campaign-status.enum.js";
import { Campaign } from "./campaign.model.js";
export class CampaignRepository {
  create = async (data: object) => {
    return Campaign.create(data);
  };

  findAll = async () => {
    return Campaign.find().populate({
      path: "brandId",
      select: "brandName logo",
    });
  };
  findById = async (campaignId: string) => {
    return Campaign.findById(campaignId).populate({
      path: "brandId",
      select: "brandName logo",
    });
  };

  findByBrandId = async (brandId: string) => {
    return Campaign.find({
      brandId,
    }).populate({
      path: "brandId",
      select: "brandName logo",
    });
  };
  updateById = async (campaignId: string, data: object) => {
    return Campaign.findByIdAndUpdate(campaignId, data, {
      new: true,
    });
  };
  deleteById = async (campaignId: string) => {
    return Campaign.findByIdAndDelete(campaignId);
  };
  incrementFilledSlots = async (campaignId: string) => {
    return Campaign.findByIdAndUpdate(
      campaignId,
      {
        $inc: {
          filledSlots: 1,
        },
      },
      {
        new: true,
      },
    );
  };
  closeCampaign = async (campaignId: string) => {
    return Campaign.findByIdAndUpdate(
      campaignId,
      {
        status: CampaignStatus.COMPLETED,
      },
      {
        new: true,
      },
    );
  };
}
