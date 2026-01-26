import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EventTicketDto } from './event-ticket.dto';

export class BaseUserDto {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  _v: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty({ enum: ['standard', 'manager', 'staff', 'admin'] })
  type: 'standard' | 'manager' | 'staff' | 'admin';

  @ApiProperty()
  blocked: boolean;

  @ApiPropertyOptional()
  phoneNumber?: string;

  @ApiProperty()
  dni: number;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  birthdate: Date;

  @ApiProperty()
  eventTickets: EventTicketDto[];
}
