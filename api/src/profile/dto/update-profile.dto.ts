import { PickType } from '@nestjs/swagger';
import { UpdateUserDto } from 'src/user/dto/request/update-user.dto';

export class UpdateProfileDto extends PickType(UpdateUserDto, [
  'firstName',
  'lastName',
  'phoneNumber',
]) {}
