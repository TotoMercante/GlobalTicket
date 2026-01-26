import { IntersectionType, PartialType } from '@nestjs/swagger';
import { BaseUserDto } from './base-user.dto';
import { ManagerDataDto } from './manager-user.dto';

export class UserDto extends IntersectionType(
  BaseUserDto,
  PartialType(ManagerDataDto),
) {}
