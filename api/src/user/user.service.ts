import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/request/create-user.dto';
import { UpdateUserDto } from './dto/request/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  private readonly managerDataPopulate = { path: 'managerData' };

  private readonly eventTicketPopulate = {
    path: 'eventTickets',
    select: '_id event date usable',
    populate: {
      path: 'event',
      select: '_id name location capacity',
    },
  };

  async getAll(): Promise<User[]> {
    const users = await this.userModel
      .find({}, { _id: 1, firstName: 1, lastName: 1, email: 1, phoneNumber: 1 })
      .exec();
    return users.map((u) => u.toObject());
  }

  async getById(id: string): Promise<User | null> {
    const user = await this.userModel
      .findById(id)
      .populate([this.managerDataPopulate, this.eventTicketPopulate])
      .exec();
    if (!user) return null;
    const userObject = user.toObject();
    return userObject;
  }

  async getByEmail(email: string): Promise<User | null> {
    const user = await this.userModel
      .findOne({ email })
      .populate([this.managerDataPopulate, this.eventTicketPopulate])
      .exec();
    if (!user) return null;
    if (user.type !== 'manager') return user.toObject();
    return user.toObject();
  }

  async createUser(
    user: CreateUserDto,
  ): Promise<[User, null] | [null, { duplicateEmail: true }]> {
    const userWithSameEmail = await this.userModel
      .findOne({
        email: user.email,
      })
      .exec();
    if (userWithSameEmail) {
      return [null, { duplicateEmail: true }];
    }
    const newUser = await new this.userModel(user).save();
    return [newUser.toObject(), null];
  }

  async update(id: string, updateData: UpdateUserDto): Promise<User | null> {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateData, {
        new: true,
        projection: {
          _id: 1,
          firstName: 1,
          lastName: 1,
          email: 1,
          phoneNumber: 1,
        },
      })
      .exec();
    return updatedUser ? updatedUser.toObject() : null;
  }

  async delete(id: string): Promise<boolean> {
    const deletedUser = await this.userModel.findByIdAndDelete(id).exec();
    return Boolean(deletedUser);
  }
}
