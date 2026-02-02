import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import type { EventTicketDto } from './event-ticket.dto';
import { ManagerDataDto } from './manager-data.dto';

export class UserDto {
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

  @ApiPropertyOptional()
  managerData?: ManagerDataDto;
}
