import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';

interface Request {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const usersRepository = getRepository(User);
    const user = await usersRepository.findOne(user_id);
    // console.log(user?.avatar);
    if (!user) {
      throw new AppError('Only authenticated users can change avatar', 401);
    }

    // first i am checking if the user already has an avatar, so i can delete before changing to the new one
    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      // console.log(user.avatar);
      // check if file exists based on file path created
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;

    // the method save will create a new user in case it does not exits, and it will update its information in case the ID already exists on the database
    await usersRepository.save(user);

    return user;
  }
}
export default UpdateUserAvatarService;
