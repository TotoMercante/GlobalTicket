import { OmitType } from '@nestjs/swagger';
import { CreateUserDto } from 'src/user/dto/request/create-user.dto';

export class RegisterProfileDto extends OmitType(CreateUserDto, [
  'businessName',
  'cuit',
  'type',
]) {}
