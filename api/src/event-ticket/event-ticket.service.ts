import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { Model, PopulateOptions } from 'mongoose';
import { Event } from 'src/event/entities/event.entity';
import { User } from 'src/user/entities/user.entity';
import { BuyTicketDto } from './dto/buy-ticket.dto';
import { EventTicket } from './entities/event-ticket.entity';

@Injectable()
export class EventTicketService {
  constructor(
    @InjectModel(EventTicket.name)
    private readonly eventTicketModel: Model<EventTicket>,
    @InjectModel(Event.name)
    private readonly eventModel: Model<Event>,
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  private readonly eventTicketPopulation: PopulateOptions[] = [
    { path: 'event', select: '_id name location capacity' },
    {
      path: 'user',
      select: '_id email fisrtName lastName phoneNumber',
    },
  ];

  async getById(id: string) {
    const ticket = await this.eventTicketModel
      .findById(id)
      .populate(this.eventTicketPopulation)
      .exec();
    return ticket?.toObject() ?? null;
  }

  async buyTicket(userId: string, data: BuyTicketDto) {
    const newTicket = await new this.eventTicketModel({
      date: data.date,
      event: data.eventId,
      user: userId,
    }).save();
    await this.userModel.findByIdAndUpdate(userId, {
      $push: { eventTickets: newTicket._id },
    });
    await this.eventModel.findByIdAndUpdate(
      data.eventId,
      {
        $inc: {
          'dates.$[date].sold': 1,
        },
      },
      {
        arrayFilters: [
          {
            'date.datetime': { $eq: data.date },
          },
        ],
      },
    );
    await newTicket.populate(this.eventTicketPopulation);
    return newTicket.toObject();
  }

  async transferTicket(ticket: EventTicket, user: User) {
    const newTicket = await new this.eventTicketModel({
      date: ticket.date,
      event: ticket.event,
      user: user._id,
    }).save();
    await this.eventTicketModel.findByIdAndUpdate(ticket._id, {
      usable: false,
    });
    await this.userModel.findByIdAndUpdate(user._id, {
      $push: { eventTickets: newTicket.id },
    });
    return newTicket;
  }
}
