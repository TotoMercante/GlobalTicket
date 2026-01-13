import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/request/create-user.dto';
import { UpdateUserDto } from './dto/request/update-user.dto';
import { ManagerData } from './entities/manager-data.entity';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(ManagerData.name)
    private readonly managerDataModel: Model<ManagerData>,
  ) {}

  async getAll(): Promise<User[]> {
    const users = await this.userModel
      .find({}, { _id: 1, firstName: 1, lastName: 1, email: 1, phoneNumber: 1 })
      .exec();
    return users.map((u) => u.toObject());
  }

  async getById(id: string): Promise<User | (User & ManagerData) | null> {
    const user = await this.userModel.findById(id).exec();
    if (!user) return null;
    if (user.type !== 'manager') return user.toObject();
    const managerData = await this.managerDataModel
      .findOne({ userId: id }, { userId: 0 })
      .exec();
    return { ...user.toObject(), ...managerData?.toObject() };
  }

  async createUser(user: CreateUserDto): Promise<User> {
    const userWithSameEmail = await this.userModel
      .findOne({
        email: user.email,
      })
      .exec();
    if (userWithSameEmail) {
      throw new Error('duplicate email');
    }
    const newUser = await this.userModel.create(user);
    return (await newUser.save()).toObject();
  }

  /* 
  async upgradeUser(
    userId: string,
    data: RequestUserUpgradeDto,
  ): Promise<ManagerData | null> {
    const user = await this.userModel
      .findByIdAndUpdate<ManagerDataDocument>(
        userId,
        {
          $set: {
            ...data,
            type: 'manager',
          },
        },
        { overwriteDiscriminatorKey: true },
      )
      .exec();
    return user ? user.toObject() : null;
  }
 */

  async update(id: string, updateData: UpdateUserDto): Promise<User | null> {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
    return updatedUser ? updatedUser.toObject() : null;
  }

  async delete(id: string): Promise<boolean> {
    const deletedUser = await this.userModel.findByIdAndDelete(id).exec();
    return Boolean(deletedUser);
  }
}
