import { OmitType } from '@nestjs/swagger';
import { UserResponseDto } from './user-response.dto';

export class CreateUserDto extends OmitType(UserResponseDto, [
  '_id',
  '__v',
  '__t',
  'eventTickets',
  'bussinessName',
  'cuit',
  'managedEvents',
]) {}
