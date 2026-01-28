import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from 'src/user/entities/user.entity';

export type ManagerRequestDocument = HydratedDocument<ManagerRequest>;

@Schema()
export class ManagerRequest {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, unique: true })
  user: User;

  @Prop({ required: true })
  businessName: string;

  @Prop({ required: true })
  cuit: number;
}

export const ManagerRequestSchema =
  SchemaFactory.createForClass(ManagerRequest);
