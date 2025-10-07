import { PickType } from '@nestjs/swagger';
import { ManagerUser } from '../entities/manager-user.entity';

export class UpgradeUserDto extends PickType(ManagerUser, [
  'bussinessName',
  'cuit',
]) {}
