import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Event } from 'src/event/entities/event.entity';
import { User } from './user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

export type ManagerUserDocument = HydratedDocument<ManagerUser>;

@Schema()
export class ManagerUser extends User {
  @ApiProperty({ example: 'Empresa S.A.' })
  @Prop({ required: true })
  bussinessName: string;

  @ApiProperty({ example: 30500000038 })
  @Prop({ required: true, unique: true })
  cuit: number;

  @ApiProperty({ type: [Event] })
  @Prop({ type: [Event], default: [] })
  managedEvents: Event[];
}

export const ManagerUserSchema = SchemaFactory.createForClass(ManagerUser);
