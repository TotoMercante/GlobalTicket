import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { ManagerUser } from '../../user/entities/manager-user.entity';

export type EventDocument = HydratedDocument<Event>;

@Schema()
export class Event {
  @Prop({ required: true })
  name: string;

  @Prop({ type: [Date], required: true })
  date: Date[];

  @Prop({ required: true })
  location: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  startSellDate: Date;

  @Prop({ required: true })
  ticketPrice: number;

  @Prop({ required: true })
  capacity: number;

  @Prop({ type: Types.ObjectId, ref: ManagerUser.name, required: true })
  managerId: string;
}

export const EventSchema = SchemaFactory.createForClass(Event);
