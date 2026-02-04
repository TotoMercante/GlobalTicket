import { ApiProperty } from '@nestjs/swagger';

export class TransferTicketDto {
  @ApiProperty()
  ticketId: string;

  @ApiProperty()
  newUserEmail: string;
}
