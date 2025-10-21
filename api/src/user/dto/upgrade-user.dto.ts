import { PickType } from '@nestjs/swagger';
import { UserResponseDto } from './user-response.dto';

export class UpgradeUserDto extends PickType(UserResponseDto, [
  'bussinessName',
  'cuit',
]) {}
