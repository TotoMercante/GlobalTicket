import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ManagerUser,
  ManagerUserDocument,
} from './entities/manager-user.entity';
import { UpgradeUserDto } from './dto/upgrade-user.dto';
import { EventTicketDto } from './dto/event-ticket.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(ManagerUser.name)
    private readonly managerUserModel: Model<ManagerUser>,
  ) {}

  async getAll(): Promise<User[]> {
    const users = await this.userModel.find().exec();
    return users.map((user) => user.toObject());
  }

  async getById(id: string): Promise<User | null> {
    const user = await this.userModel.findById(id).exec();
    console.log(user);
    return user ? user.toObject() : null;
  }

  async createUser(user: CreateUserDto): Promise<User> {
    const newUser = await this.userModel.create({
      ...user,
    });
    return (await newUser.save()).toObject();
  }

  async upgradeUser(
    userId: string,
    data: UpgradeUserDto,
  ): Promise<ManagerUser | null> {
    const user = await this.userModel
      .findByIdAndUpdate<ManagerUserDocument>(
        userId,
        {
          $set: {
            ...data,
            __t: ManagerUser.name,
          },
        },
        { overwriteDiscriminatorKey: true },
      )
      .exec();
    return user ? user.toObject() : null;
  }

  async update(id: string, updateData: UpdateUserDto): Promise<User | null> {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
    return updatedUser ? updatedUser.toObject() : null;
  }

  async addTicket(userId: string, data: EventTicketDto): Promise<User> {
    const foundUser = await this.userModel
      .findByIdAndUpdate(userId, {
        $push: { boughtEvents: data },
      })
      .exec();
    if (!foundUser) {
      throw new Error(`User with id ${userId} not found`);
    }
    return foundUser.toObject();
  }

  async delete(id: string): Promise<boolean> {
    const deletedUser = await this.userModel.findByIdAndDelete(id).exec();
    return Boolean(deletedUser);
  }
}
