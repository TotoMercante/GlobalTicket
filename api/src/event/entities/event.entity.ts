import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { EventDate, EventDateSchema } from './event-date.entity';
import { User } from 'src/user/entities/user.entity';

export type EventDocument = HydratedDocument<Event, EventDocumentOverride>;

export type EventDocumentOverride = {
  dates: Types.DocumentArray<EventDate>;
};

@Schema()
export class Event {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  location: string;

  @Prop({ required: true })
  capacity: number;

  @Prop({ required: true })
  ticketPrice: number;

  @Prop([EventDateSchema])
  dates: EventDate[];

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  manager: User;
}

export const EventSchema = SchemaFactory.createForClass(Event);
