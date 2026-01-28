import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { ManagerRequest } from './entities/manager-request.entity';
import type { Connection, Model } from 'mongoose';
import { CreateManagerRequestDto } from './dto/create-manager-request.dto';
import { ManagerData } from 'src/user/entities/manager-data.entity';
import { User } from 'src/user/entities/user.entity';

type CreateManagerRequestError = {
  duplicateRequest?: boolean;
  alreadyManager?: boolean;
};

@Injectable()
export class ManagerRequestService {
  constructor(
    @InjectConnection()
    private readonly connection: Connection,
    @InjectModel(ManagerRequest.name)
    private readonly managerRequestModel: Model<ManagerRequest>,
    @InjectModel(ManagerData.name)
    private readonly managerDataModel: Model<ManagerData>,
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async getAll(): Promise<ManagerRequest[]> {
    const requests = await this.managerRequestModel
      .find()
      .populate({
        path: 'user',
        select: 'firstName lastName email phoneNumber',
        justOne: true,
      })
      .exec();
    return requests.map((r) => r.toObject());
  }

  async getById(id: string): Promise<ManagerRequest | null> {
    const request = await this.managerRequestModel
      .findById(id)
      .populate({
        path: 'user',
        select: 'firstName lastName email phoneNumber',
        justOne: true,
      })
      .exec();
    return request?.toObject() ?? null;
  }

  async create(
    data: CreateManagerRequestDto,
  ): Promise<[ManagerRequest, null] | [null, CreateManagerRequestError]> {
    const existingRequest = await this.managerRequestModel
      .findOne({
        user: data.user,
      })
      .exec();
    if (existingRequest) return [null, { duplicateRequest: true }];
    const existingManagerData = await this.managerDataModel
      .findOne({ user: data.user })
      .exec();
    if (existingManagerData) return [null, { alreadyManager: true }];

    const request = await new this.managerRequestModel(data).save();
    return [request.toObject(), null];
  }

  async accept(id: string): Promise<ManagerData | null> {
    const session = await this.connection.startSession();
    return session
      .withTransaction(async () => {
        const requestDoc = await this.managerRequestModel
          .findByIdAndDelete(id)
          .exec();
        if (!requestDoc) return null;
        const { user, businessName, cuit } = requestDoc.toObject();
        const managerData = await new this.managerDataModel({
          userId: user,
          businessName,
          cuit,
        }).save();
        await this.userModel
          .findByIdAndUpdate(user, {
            type: 'manager',
          })
          .exec();
        return managerData.toObject();
      })
      .finally(() => void session.endSession());
  }

  async reject(id: string): Promise<boolean> {
    const result = await this.managerRequestModel.findByIdAndDelete(id).exec();
    return Boolean(result);
  }
}
