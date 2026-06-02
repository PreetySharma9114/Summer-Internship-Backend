import { Document, Types } from "mongoose";

import { UserRole } from "../../../common/enums/user-role.enum.js";

export interface IProfile extends Document {
  userId: Types.ObjectId;

  profileType: UserRole;
}