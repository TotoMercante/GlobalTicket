import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { EventTicket, EventTicketSchema } from './event-ticket.entity';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  dni: number;

  @Prop({ required: true })
  birthdate: Date;

  @Prop({ type: [EventTicketSchema], default: [] })
  boughtEvents: EventTicket[];
}

export const UserSchema = SchemaFactory.createForClass(User);
