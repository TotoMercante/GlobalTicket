import { ApiProperty } from '@nestjs/swagger';
import { EventShortDto } from 'src/event/dto/response/event-short.dto';
import { UserShortDto } from 'src/user/dto/response/user-short.dto';

export class EventTicketDto {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  event: EventShortDto;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  user: UserShortDto;

  @ApiProperty()
  usable: boolean;
}
