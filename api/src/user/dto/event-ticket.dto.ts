import { ApiProperty } from '@nestjs/swagger';

export class EventTicketDto {
  @ApiProperty()
  eventId: string;

  @ApiProperty()
  date: Date;

  @ApiProperty({ example: 2 })
  quantity: number;
}
