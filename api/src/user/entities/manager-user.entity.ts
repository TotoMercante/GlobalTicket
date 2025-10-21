import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Event, EventSchema } from 'src/event/entities/event.entity';
import { User } from './user.entity';
import { HydratedDocument } from 'mongoose';

export type ManagerUserDocument = HydratedDocument<ManagerUser>;

@Schema()
export class ManagerUser extends User {
  @Prop({ required: true })
  bussinessName: string;

  @Prop({ required: true, unique: true })
  cuit: number;

  @Prop({ type: [EventSchema], default: [] })
  managedEvents: Event[];
}

export const ManagerUserSchema = SchemaFactory.createForClass(ManagerUser);
