import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { EventTicket, EventTicketSchema } from './event-ticket.entity';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @ApiProperty({ example: 'direccion@ejemplo.com' })
  @Prop({ required: true })
  email: string;

  @ApiProperty({ example: 'PasswordSegura123!' })
  @Prop({ required: true })
  password: string;

  @ApiProperty({ example: '+542211234567' })
  @Prop({ required: true })
  phoneNumber: string;

  @ApiProperty({ example: 'Juan' })
  @Prop({ required: true })
  firstName: string;

  @ApiProperty({ example: 'Pérez' })
  @Prop({ required: true })
  lastName: string;

  @ApiProperty({ example: 12345678 })
  @Prop({ required: true, unique: true })
  dni: number;

  @ApiProperty({ example: new Date(1990, 0, 1).toISOString() })
  @Prop({ required: true })
  birthdate: Date;

  @ApiProperty({ type: [EventTicket] })
  @Prop({ type: [EventTicketSchema], default: [] })
  boughtEvents: EventTicket[];
}

export const UserSchema = SchemaFactory.createForClass(User);
