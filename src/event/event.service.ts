import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Event } from './entities/event.entity';
import { Connection, Model } from 'mongoose';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { ManagerUser } from '../user/entities/manager-user.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectConnection() private readonly connection: Connection,
    @InjectModel(Event.name) private readonly eventModel: Model<Event>,
    @InjectModel(ManagerUser.name)
    private readonly managerUserModel: Model<ManagerUser>,
  ) {}

  async create(event: CreateEventDto): Promise<Event> {
    const session = await this.connection.startSession();
    return await session.withTransaction(async () => {
      const newEvent = new this.eventModel(event);
      await newEvent.save();
      this.managerUserModel.findByIdAndUpdate(event.managerId, {
        $push: { managedEvents: newEvent },
      });
      return newEvent.toObject();
    });
  }

  async getAll(): Promise<Event[]> {
    const events = await this.eventModel.find().exec();
    return events.map((event) => event.toObject());
  }

  async getById(id: string): Promise<Event | null> {
    const event = await this.eventModel.findById(id).exec();
    return event ? event.toObject() : null;
  }

  async updateEvent(id: string, data: UpdateEventDto): Promise<Event | null> {
    const updatedEvent = await this.eventModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();
    return updatedEvent ? updatedEvent.toObject() : null;
  }

  async deleteEvent(id: string): Promise<boolean> {
    const result = await this.eventModel.findByIdAndDelete(id).exec();
    return Boolean(result);
  }
}
