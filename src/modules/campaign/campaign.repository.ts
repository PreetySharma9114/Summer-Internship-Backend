import { CampaignStatus } from "../../common/enums/campaign-status.enum.js";
import { Campaign } from "./campaign.model.js";
import { BrandProfile } from "../profile/models/brand-profile.model.js";
export class CampaignRepository {
  create = async (data: object) => {
    return Campaign.create(data);
  };

findAll = async () => {
  const campaigns = await Campaign.find();

  const result = [];

  for (const campaign of campaigns) {
    const brandProfile = await BrandProfile.findOne({
      userId: campaign.brandId,
    });

    result.push({
      ...campaign.toObject(),
      brand: {
        brandName: brandProfile?.brandName,
        logo: brandProfile?.logo,
      },
    });
  }

  return result;
};
findById = async (campaignId: string) => {
  const campaign = await Campaign.findById(campaignId);

  if (!campaign) {
    return null;
  }

  const brandProfile = await BrandProfile.findOne({
    userId: campaign.brandId,
  });

  return {
    ...campaign.toObject(),
    brand: {
      brandName: brandProfile?.brandName,
      logo: brandProfile?.logo,
    },
  };
};

  findByBrandId = async (brandId: string) => {
    return Campaign.find({
      brandId,
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
