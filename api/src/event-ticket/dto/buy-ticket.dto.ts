import { ApiProperty } from '@nestjs/swagger';

export class BuyTicketDto {
  @ApiProperty()
  eventId: string;

  @ApiProperty({ type: Date })
  date: string;
}
