import { CampaignStatus } from "../../common/enums/campaign-status.enum.js";

export const getCampaignStatus = (
  startDate: Date,
  endDate: Date,
): CampaignStatus => {
  const today = new Date();

  if (today < startDate) {
    return CampaignStatus.INACTIVE;
  }

  if (today > endDate) {
    return CampaignStatus.COMPLETED;
  }

  return CampaignStatus.ACTIVE;
};
