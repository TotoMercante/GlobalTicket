import { OmitType } from '@nestjs/swagger';
import { ManagerUser } from '../entities/manager-user.entity';

export class CreateManagerUserDto extends OmitType(ManagerUser, [
  'managedEvents',
]) {}
