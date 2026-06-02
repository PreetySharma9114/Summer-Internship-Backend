export interface IInfluencerProfile {
  userId: string;

  fullName: string;

  username: string;

  bio: string;

  niche: string;

  instagramUsername?: string;

  youtubeUsername?: string;
  instagramFollowers?: number;

  youtubeFollowers?: number;

  profileImage?: string;
}
