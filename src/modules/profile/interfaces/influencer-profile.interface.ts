import { IProfile } from "./profile.interface.js";
export interface IInfluencerProfile extends IProfile { 
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
