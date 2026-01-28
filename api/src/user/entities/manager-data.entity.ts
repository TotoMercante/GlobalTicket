import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import type { Event } from 'src/event/entities/event.entity';

export type ManagerDataDocument = HydratedDocument<ManagerData>;

@Schema()
export class ManagerData {
  @Prop({ required: true, unique: true })
  userId: string;

  @Prop({ required: true })
  businessName: string;

  @Prop({ required: true, unique: true })
  cuit: number;

  @Prop({ type: [Types.ObjectId], ref: 'Event', default: [] })
  managedEvents: Event[];
}

export const ManagerDataSchema = SchemaFactory.createForClass(ManagerData);
