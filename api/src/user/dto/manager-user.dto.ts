import { ApiProperty, IntersectionType, OmitType } from '@nestjs/swagger';
import { EventBaseDto } from 'src/event/dto/event-base.dto';
import { BaseUserDto } from './base-user.dto';

export class ManagerDataDto {
  @ApiProperty()
  businessName: string;

  @ApiProperty()
  cuit: number;

  @ApiProperty()
  events: EventBaseDto[];
}

export class ManagerUserDto extends IntersectionType(
  OmitType(BaseUserDto, ['type']),
  ManagerDataDto,
) {
  @ApiProperty({ enum: ['manager'] })
  type: 'manager';
}
