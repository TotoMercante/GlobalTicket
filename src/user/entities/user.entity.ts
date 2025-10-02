import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

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
}

export const UserSchema = SchemaFactory.createForClass(User);
