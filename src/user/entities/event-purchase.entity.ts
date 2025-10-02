import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Event } from 'src/event/entities/event.entity';

import { Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ _id: false })
export class EventPurchase {
  @ApiProperty()
  @Prop({ type: Types.ObjectId, ref: Event.name, required: true })
  eventId: string;

  @ApiProperty()
  @Prop({ required: true })
  date: Date;

  @ApiProperty({ example: 2 })
  @Prop({ required: true })
  quantity: number;
}

export const EventPurchaseSchema = SchemaFactory.createForClass(EventPurchase);
