import { IntersectionType, OmitType, PartialType } from '@nestjs/swagger';
import { ManagerUserDto } from './manager-user.dto';
import { BaseUserDto } from './base-user.dto';

export class UserDto extends IntersectionType(
  PartialType(OmitType(ManagerUserDto, ['type'])),
  BaseUserDto,
) {}
