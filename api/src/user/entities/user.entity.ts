import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { EventTicket, EventTicketSchema } from './event-ticket.entity';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({
    required: true,
    enum: ['standard', 'manager', 'staff', 'admin'],
    default: 'standard',
  })
  type: 'standard' | 'manager' | 'staff' | 'admin' = 'standard';

  @Prop({ required: true, default: false })
  blocked: boolean = false;

  @Prop({ required: false })
  phoneNumber: string;

  @Prop({ required: true })
  dni: number;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  birthdate: Date;

  @Prop({ type: [EventTicketSchema], default: [] })
  eventTickets: EventTicket[];
}

export const UserSchema = SchemaFactory.createForClass(User);
