import { PickType } from '@nestjs/swagger';
import { BaseUserDto } from '../base-user.dto';

export class UserShortDto extends PickType(BaseUserDto, [
  '_id',
  'firstName',
  'lastName',
  'email',
  'phoneNumber',
]) {}
