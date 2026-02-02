import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/request/create-event.dto';
import { UpdateEventDto } from './dto/request/update-event.dto';
import { EventShortDto } from './dto/response/event-short.dto';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { EventDto } from './dto/event.dto';
import { GetEventsQuery } from './dto/request/get-events-query.dto';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { User } from 'src/auth/user.decorator';
import { UserDto } from 'src/user/dto/user.dto';

// TODO Implementar control de acceso
@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  @ApiOkResponse({ type: EventShortDto, isArray: true })
  async getAll(@Query() query: GetEventsQuery) {
    return this.eventService.getAll(query);
  }

  @Get(':id')
  @ApiOkResponse({ type: EventDto })
  @ApiNotFoundResponse({ description: 'Event not found' })
  async getById(@Param('id') id: string) {
    const event = await this.eventService.getById(id);
    if (!event) {
      throw new NotFoundException(`Event with id ${id} not found`);
    }
    return event;
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Login required' })
  @ApiForbiddenResponse({ description: 'Only managers can create events' })
  @ApiBadRequestResponse({ description: 'Invalid data or manager not found' })
  @ApiCreatedResponse({ type: EventShortDto })
  async create(@User() user: UserDto, @Body() event: CreateEventDto) {
    if (user.type !== 'manager') {
      throw new ForbiddenException('Only managers can create events');
    }
    try {
      event.managerId = user._id;
      return this.eventService.create(event);
    } catch (err) {
      if (err instanceof Error) return new BadRequestException(err.message);
      else throw err;
    }
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Login required' })
  @ApiForbiddenResponse({
    description: 'Only the manager who owns the event can modify it',
  })
  @ApiOkResponse({ type: EventShortDto })
  @ApiNotFoundResponse({ description: 'Event not found' })
  @ApiBadRequestResponse({ description: 'Invalid data' })
  async update(
    @User() user: UserDto,
    @Param('id') id: string,
    @Body() data: UpdateEventDto,
  ) {
    if (user.type !== 'manager') {
      throw new ForbiddenException('Only managers can modify events');
    }
    const existing = await this.eventService.getById(id);
    if (!existing) {
      throw new NotFoundException(`Event with id ${id} not found`);
    }
    if (String(existing.manager._id) !== String(user._id)) {
      throw new ForbiddenException('You can only modify your own events');
    }
    const event = await this.eventService.updateEvent(id, data);
    return event;
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Login required' })
  @ApiForbiddenResponse({
    description: 'Only the manager who owns the event can delete it',
  })
  @ApiOkResponse({ description: 'Event deleted' })
  @ApiNotFoundResponse({ description: 'Event not found' })
  @ApiBadRequestResponse({ description: 'Event has sold tickets' })
  async delete(@User() user: UserDto, @Param('id') id: string) {
    if (user.type !== 'manager') {
      throw new ForbiddenException('Only managers can delete events');
    }
    const existing = await this.eventService.getById(id);
    if (!existing) {
      throw new NotFoundException(`Event with id ${id} not found`);
    }
    if (String(existing.manager._id) !== String(user._id)) {
      throw new ForbiddenException('You can only delete your own events');
    }
    const [success, error] = await this.eventService.deleteEvent(id);
    if (!success) {
      if (error.notFound)
        throw new NotFoundException(`Event with id ${id} not found`);
      if (error.alreadySold)
        throw new BadRequestException(`Event with id ${id} has sold tickets`);
    }
    return { message: 'Event deleted successfully' };
  }
}
