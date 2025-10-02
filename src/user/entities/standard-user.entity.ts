import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from './user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { EventPurchase, EventPurchaseSchema } from './event-purchase.entity';

@Schema()
export class StandardUser extends User {
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

  @Prop({ type: [EventPurchaseSchema], default: [] })
  boughtEvents: EventPurchase[];
}

export const StandardUserSchema = SchemaFactory.createForClass(StandardUser);
