import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class EventDate {
  @Prop({ required: true })
  datetime: Date;

  @Prop({ required: true })
  sold: number;
}

export const EventDateSchema = SchemaFactory.createForClass(EventDate);
