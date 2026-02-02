import { ApiProperty } from '@nestjs/swagger';
import { UserShortDto } from 'src/user/dto/response/user-short.dto';
import { EventDateDto } from './event-date.dto';

export class EventDto {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  _v: number;

  @ApiProperty({ example: 'Nombre de evento' })
  name: string;

  @ApiProperty({ example: 'Descripción del evento' })
  description: string;

  @ApiProperty({ example: 'Hipódromo de La Plata' })
  location: string;

  @ApiProperty()
  capacity: number;

  @ApiProperty({ example: 25_000 })
  ticketPrice: number;

  @ApiProperty({ type: EventDateDto, isArray: true })
  dates: EventDateDto[];

  @ApiProperty()
  manager: UserShortDto;
}
