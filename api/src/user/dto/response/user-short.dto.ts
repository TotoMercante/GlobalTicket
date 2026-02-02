import { PickType } from '@nestjs/swagger';
import { UserDto } from '../user.dto';

export class UserShortDto extends PickType(UserDto, [
  '_id',
  'firstName',
  'lastName',
  'email',
  'phoneNumber',
]) {}
