import {
  BadRequestException,
  Body,
  Controller,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { User } from 'src/auth/user.decorator';
import { EventService } from 'src/event/event.service';
import { UserService } from 'src/user/user.service';
import { BuyTicketDto } from './dto/buy-ticket.dto';
import { EventTicketDto } from './dto/event-ticket.dto';
import { TransferTicketDto } from './dto/transfer-ticket.dto';
import { EventTicketService } from './event-ticket.service';
import { UserDto } from 'src/user/dto/user.dto';

@Controller('event-ticket')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@ApiUnauthorizedResponse()
export class EventTicketController {
  constructor(
    private readonly eventTicketService: EventTicketService,
    private readonly userService: UserService,
    private readonly eventService: EventService,
  ) {}

  @Get(':id')
  @ApiOkResponse({ type: EventTicketDto })
  @ApiNotFoundResponse()
  @ApiForbiddenResponse()
  async getById(@User() user: UserDto, @Param('id') ticketId: string) {
    const ticket = await this.eventTicketService.getById(ticketId);
    if (!ticket)
      throw new NotFoundException(`Event ticket with id ${ticketId} not found`);
    // Only staff and owner can get the ticket
    const canGetTicket =
      user.type == 'staff' || String(user._id) == String(ticket.user._id);
    if (!canGetTicket)
      throw new ForbiddenException(`You are not the owner of this ticket`);
    return ticket;
  }

  @Post()
  @ApiCreatedResponse({ type: EventTicketDto })
  @ApiNotFoundResponse({ description: 'Event or event date not found' })
  @ApiBadRequestResponse({
    description: 'Ticket count exceed event capacity for the selected date ',
  })
  async buyTicket(@User('_id') userId: string, @Body() data: BuyTicketDto) {
    const event = await this.eventService.getById(data.eventId);
    if (!event)
      throw new NotFoundException(`Event with id ${data.eventId} not found.`);
    const eventDate = event.dates.find(
      (date) => date.datetime.toISOString() == data.date,
    );
    if (!eventDate)
      throw new NotFoundException(`Event has not date ${data.date}`);
    if (eventDate.sold == event.capacity)
      throw new BadRequestException(`Event has not enough capacity`);
    return await this.eventTicketService.buyTicket(userId, data);
  }

  @Post('transfer')
  @ApiCreatedResponse({ type: EventTicketDto })
  @ApiNotFoundResponse({ description: 'Ticket or user not found' })
  async transferTicket(@Body() data: TransferTicketDto) {
    const ticket = await this.eventTicketService.getById(data.ticketId);
    if (!ticket)
      throw new NotFoundException(
        `Event ticket with id ${data.ticketId} not found`,
      );
    const user = await this.userService.getByEmail(data.newUserEmail);
    if (!user)
      throw new NotFoundException(
        `User with email ${data.newUserEmail} not found`,
      );
    return await this.eventTicketService.transferTicket(ticket, user);
  }
}
