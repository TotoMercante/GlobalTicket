import { ApiProperty } from '@nestjs/swagger';
import { EventShortDto } from 'src/event/dto/response/event-short.dto';

export class ManagerDataDto {
  @ApiProperty()
  businessName: string;

  @ApiProperty()
  cuit: number;

  @ApiProperty()
  managedEvents: EventShortDto[];
}
