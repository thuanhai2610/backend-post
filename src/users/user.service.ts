import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId, Types } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly model: Model<UserDocument>,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.findByEmail(email);
    if (
      user &&
      user.password &&
      (await bcrypt.compare(password, user.password))
    ) {
      console.log('User validated ', user);
      return user;
    }
    throw new BadRequestException('Invalid credentials ', email);
  }

  findByEmail(email: string) {
    return this.model.findOne({ email }).exec();
  }
  async create(user: Partial<User>) {
    return this.model.create(user);
  }

  updatePasswordAndResetOTP(userId: string, newPassword: string) {
    return this.model.updateOne(
      { _id: userId },
      {
        $set: {
          password: newPassword,
          isVerified: false,
        },
      },
    );
  }
  verifyEmail(email: string) {
    return this.model.updateOne({ email }, { isVerified: true });
  }

  updateForgotPassword(userId: string, newPassword: string) {
    return this.model.findByIdAndUpdate(userId, {
      password: newPassword,
      isVerified: true,
    });
  }

  findById(userObjectId: Types.ObjectId) {
    return this.model.findById(userObjectId).exec();
  }

  async updatePassword(userId: string, newPassword: string) {
    const objectId = new Types.ObjectId(userId);
    const updated = await this.model.findByIdAndUpdate(
      objectId,
      { password: newPassword },
      { new: true },
    );

    if (!updated) {
      throw new Error('User not found in updatePassword');
    }
    return updated;
  }
}
