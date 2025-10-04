import { OmitType } from '@nestjs/swagger';
import { StandardUser } from '../entities/standard-user.entity';

export class CreateStandardUserDto extends OmitType(StandardUser, [
  'boughtEvents',
]) {
  __t = StandardUser.name;
}
