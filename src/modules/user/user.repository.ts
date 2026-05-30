import { User, IUser } from './user.model.js';

import { ProfileStatus } from '../../common/enums/profile-status.enum.js';

export class UserRepository {

  async create(
    data: Partial<IUser>,
  ) {
    return User.create(data);
  }

  async findById(
    userId: string,
  ) {
    return User.findById(userId);
  }

  async findByEmail(
    email: string,
  ) {
    return User.findOne({
      email,
    });
  }

  async update(
    userId: string,
    data: Partial<IUser>,
  ) {
    return User.findByIdAndUpdate(
      userId,
      data,
      {
        new: true,
      },
    );
  }

  async updateProfileStatus(
    userId: string,
    profileStatus: ProfileStatus,
  ) {
    return User.findByIdAndUpdate(
      userId,
      {
        profileStatus,
      },
      {
        new: true,
      },
    );
  }
}