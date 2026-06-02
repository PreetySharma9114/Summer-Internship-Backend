import { IProfile } from "./profile.interface.js";
export interface IBrandProfile extends IProfile {

  brandName: string;

  website: string;

  description: string;

  industry: string;

  instagramUsername?: string;

  logo?: string;
}