import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Event } from 'src/event/entities/event.entity';
import { User } from 'src/user/entities/user.entity';

export type EventTicketDocument = HydratedDocument<EventTicket>;

@Schema()
export class EventTicket {
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Event', required: true })
  event: Event;

  @Prop({ required: true })
  date: Date;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop({ default: true })
  usable: boolean;
}

export const EventTicketSchema = SchemaFactory.createForClass(EventTicket);
