import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type EventTicketDocument = HydratedDocument<EventTicket>;

@Schema()
export class EventTicket {
  @Prop({ type: Types.ObjectId, ref: 'Event', required: true })
  eventId: string;

  @Prop({ required: true })
  date: Date;
}

export const EventTicketSchema = SchemaFactory.createForClass(EventTicket);
