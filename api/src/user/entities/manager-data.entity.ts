import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Event, EventSchema } from 'src/event/entities/event.entity';

export type ManagerDataDocument = HydratedDocument<ManagerData>;

@Schema({ _id: false })
export class ManagerData {
  @Prop({ required: true, unique: true })
  userId: string;

  @Prop({ required: true })
  bussinessName: string;

  @Prop({ required: true, unique: true })
  cuit: number;

  @Prop({ type: [EventSchema], default: [] })
  managedEvents: Event[];
}

export const ManagerDataSchema = SchemaFactory.createForClass(ManagerData);
