import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { ManagerUser } from '../../user/entities/manager-user.entity';

@Schema()
export class Event {
  @ApiProperty({ example: 'Nombre de evento' })
  @Prop({ required: true })
  name: string;

  @ApiProperty({ example: [new Date(2025, 11, 17).toISOString()] })
  @Prop({ type: [Date], required: true })
  date: Date[];

  @ApiProperty({ example: 'Hipódromo de La Plata' })
  @Prop({ required: true })
  location: string;

  @ApiProperty({ example: 'Descripción del evento' })
  @Prop({ required: true })
  description: string;

  @ApiProperty({ example: new Date(2025, 10, 1).toISOString() })
  @Prop({ required: true })
  startSellDate: Date;

  @ApiProperty({ example: 25_000 })
  @Prop({ required: true })
  ticketPrice: number;

  @ApiProperty()
  @Prop({ type: Types.ObjectId, ref: ManagerUser.name, required: true })
  managerId: string;
}

export const EventSchema = SchemaFactory.createForClass(Event);
