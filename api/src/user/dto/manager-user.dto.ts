import { ApiProperty, IntersectionType, OmitType } from '@nestjs/swagger';
import { EventShortDto } from 'src/event/dto/response/event-short.dto';
import { BaseUserDto } from './base-user.dto';

export class ManagerDataDto {
  @ApiProperty()
  businessName: string;

  @ApiProperty()
  cuit: number;

  @ApiProperty()
  events: EventShortDto[];
}

export class ManagerUserDto extends IntersectionType(
  OmitType(BaseUserDto, ['type']),
  ManagerDataDto,
) {
  @ApiProperty({ enum: ['manager'] })
  type: 'manager';
}
