import { PickType } from '@nestjs/swagger';
import { EventDto } from '../event.dto';

export class EventShortDto extends PickType(EventDto, [
  '_id',
  'name',
  'location',
  'dates',
]) {}
