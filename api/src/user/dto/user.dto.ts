import { ApiProperty, ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { EventTicketDto } from 'src/event-ticket/dto/event-ticket.dto';
import { ManagerDataDto } from './manager-data.dto';

class EventTicketWithoutUser extends OmitType(EventTicketDto, ['user']) {}

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

  @ApiProperty({
    type: [EventTicketWithoutUser],
  })
  eventTickets: EventTicketWithoutUser[];

  @ApiPropertyOptional()
  managerData?: ManagerDataDto;
}
