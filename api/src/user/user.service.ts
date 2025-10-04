import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { UpdateUserDto } from './dto/update-user.dto';
import { StandardUser } from './entities/standard-user.entity';
import { CreateStandardUserDto } from './dto/create-standard-user.dto';
import { ManagerUser } from './entities/manager-user.entity';
import { CreateManagerUserDto } from './dto/create-manager-user.dto';
import { EventPurchaseDto } from './dto/event-purchase.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(StandardUser.name)
    private readonly standardUserModel: Model<StandardUser>,
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

  async createStandardUser(user: CreateStandardUserDto): Promise<StandardUser> {
    const newUser = await this.standardUserModel.create({
      ...user,
      __t: StandardUser.name,
    });
    return (await newUser.save()).toObject();
  }

  async createManagerUser(user: CreateManagerUserDto): Promise<ManagerUser> {
    const newUser = await this.managerUserModel.create(user);
    return (await newUser.save()).toObject();
  }

  async update(id: string, updateData: UpdateUserDto): Promise<User | null> {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
    return updatedUser ? updatedUser.toObject() : null;
  }

  async addPurchase(
    userId: string,
    data: EventPurchaseDto,
  ): Promise<StandardUser> {
    const foundUser = await this.standardUserModel
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
