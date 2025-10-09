import { OmitType } from '@nestjs/swagger';
import { EventBaseDto } from './event-base.dto';

export class CreateEventDto extends OmitType(EventBaseDto, ['_id']) {}
