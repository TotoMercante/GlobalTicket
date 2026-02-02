import { ApiProperty, OmitType } from '@nestjs/swagger';
import { EventDto } from '../event.dto';

export class CreateEventDto extends OmitType(EventDto, [
  '_id',
  '_v',
  'manager',
  'dates',
]) {
  managerId: string;

  @ApiProperty({ type: [Date] })
  dates: string[];
}
