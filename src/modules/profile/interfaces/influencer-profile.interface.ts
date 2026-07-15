import { IProfile } from "./profile.interface.js";
export interface IInfluencerProfile extends IProfile {
  fullName: string;
  username: string;
  bio: string;
  niches: string[];
  instagramToken:string;
  instagramUsername: string;
  instagramFollowers: number;
  youtubeUsername?: string;
  youtubeFollowers?: number;
  profileImage?: string;
}
