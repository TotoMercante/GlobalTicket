import { PickType } from '@nestjs/swagger';
import { UserBaseDto } from './user-base.dto';

export class UpgradeUserDto extends PickType(UserBaseDto, [
  'bussinessName',
  'cuit',
]) {}
