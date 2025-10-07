import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, Types } from 'mongoose';

export type EventTicketDocument = HydratedDocument<EventTicket>;

@Schema({ _id: false })
export class EventTicket {
  @ApiProperty()
  @Prop({ type: Types.ObjectId, ref: 'Event', required: true })
  eventId: string;

  @ApiProperty()
  @Prop({ required: true })
  date: Date;

  @ApiProperty({ example: 2 })
  @Prop({ required: true })
  quantity: number;
}

export const EventTicketSchema = SchemaFactory.createForClass(EventTicket);
