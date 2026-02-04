import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { User } from 'src/user/entities/user.entity';
import { EventDateDto } from './dto/event-date.dto';
import { CreateEventDto } from './dto/request/create-event.dto';
import { GetEventsQuery } from './dto/request/get-events-query.dto';
import { UpdateEventDto } from './dto/request/update-event.dto';
import { Event } from './entities/event.entity';
import {
  compareEventDates,
  parseGetEventsQuery as parseGetEventsFilterQuery,
} from './utils';

@Injectable()
export class EventService {
  constructor(
    @InjectConnection() private readonly connection: Connection,
    @InjectModel(Event.name) private readonly eventModel: Model<Event>,
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async create(event: CreateEventDto): Promise<Event> {
    return await this.connection.withSession(async (session) =>
      session.withTransaction(async () => {
        const newEvent = new this.eventModel({
          ...event,
          manager: event.managerId,
          dates: event.dates
            .map((date) => ({ datetime: date, sold: 0 }))
            .sort(compareEventDates),
        });
        const manager = await this.userModel
          .findByIdAndUpdate(event.managerId, {
            $push: { 'managerData.managedEvents': newEvent._id },
          })
          .exec();
        if (!manager) {
          throw new Error(
            `User with id ${event.managerId} was not found or is not a manager`,
          );
        }
        return (await newEvent.save()).toObject();
      }),
    );
  }

  async getAll(query: GetEventsQuery): Promise<Event[]> {
    const parsedQuery = parseGetEventsFilterQuery(query);
    let dbQuery = this.eventModel
      .find(parsedQuery, {
        _id: 1,
        name: 1,
        location: 1,
        capacity: 1,
      })
      .sort({ 'dates.0.datetime': 1 });
    const { page = 1, ['per-page']: perPage = 20 } = query;
    dbQuery = dbQuery.skip(perPage * (page - 1)).limit(perPage);

    const events = await dbQuery.exec();
    return events.map((event) => event.toObject());
  }

  async getByManager(managerId: string): Promise<Event[]> {
    const events = await this.eventModel
      .find(
        { manager: managerId },
        { _id: 1, name: 1, location: 1, capacity: 1 },
      )
      .sort({ 'dates.0.datetime': 1 })
      .exec();
    return events.map((e) => e.toObject());
  }

  async getById(id: string): Promise<Event | null> {
    const event = await this.eventModel.findById(id).exec();
    if (!event) return null;
    await event.populate({
      path: 'manager',
      select: '_id firstName lastName email phoneNumber',
    });
    return event.toObject();
  }

  async updateEvent(id: string, data: UpdateEventDto): Promise<Event | null> {
    const event = await this.eventModel.findById(id).exec();
    if (!event) return null;
    const parsedDatesFromData = data.dates
      ?.map<EventDateDto>((date) => {
        const existingDate = event.dates.find(
          (ed) => ed.datetime.toISOString() == date,
        );
        return { datetime: date, sold: existingDate?.sold ?? 0 };
      })
      .sort(compareEventDates);
    await event
      .updateOne({ ...data, dates: parsedDatesFromData }, { new: true })
      .exec();
    return event ? event.toObject() : null;
  }

  async deleteEvent(
    id: string,
  ): Promise<
    [true, null] | [false, { notFound?: boolean; alreadySold?: boolean }]
  > {
    const event = await this.eventModel.findById(id).exec();
    if (!event) return [false, { notFound: true }];
    if (event.dates.some((date) => date.sold > 0))
      return [false, { alreadySold: true }];
    await event.deleteOne().exec();
    return [true, null];
  }
}
