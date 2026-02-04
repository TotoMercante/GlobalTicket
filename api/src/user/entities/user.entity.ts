import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { ManagerData, ManagerDataSchema } from './manager-data.entity';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  _id: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({
    required: true,
    enum: ['standard', 'manager', 'staff', 'admin'],
    default: 'standard',
  })
  type: 'standard' | 'manager' | 'staff' | 'admin' = 'standard';

  @Prop({ required: false })
  phoneNumber?: string;

  @Prop({ required: true })
  dni: number;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  birthdate: Date;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'EventTicket' }], default: [] })
  eventTickets: string[];

  @Prop({ type: ManagerDataSchema, required: false })
  managerData?: ManagerData;
}

export const UserSchema = SchemaFactory.createForClass(User);
