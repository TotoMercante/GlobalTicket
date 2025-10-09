import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventResponseDto } from './dto/event-response.dto';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  @ApiOkResponse({ type: EventResponseDto, isArray: true })
  async getAll() {
    return this.eventService.getAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: EventResponseDto })
  @ApiNotFoundResponse({ description: 'Event not found' })
  async getById(@Param('id') id: string) {
    const event = await this.eventService.getById(id);
    if (!event) {
      throw new NotFoundException(`Event with id ${id} not found`);
    }
    return event;
  }

  @Post()
  @ApiCreatedResponse({ type: EventResponseDto })
  async create(@Body() event: CreateEventDto) {
    return this.eventService.create(event);
  }

  @Put(':id')
  @ApiOkResponse({ type: EventResponseDto })
  @ApiNotFoundResponse({ description: 'Event not found' })
  async update(@Param('id') id: string, @Body() data: UpdateEventDto) {
    const event = await this.eventService.updateEvent(id, data);
    if (!event) {
      throw new NotFoundException(`Event with id ${id} not found`);
    }
    return event;
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Event deleted' })
  @ApiNotFoundResponse({ description: 'Event not found' })
  async delete(@Param('id') id: string) {
    const success = await this.eventService.deleteEvent(id);
    if (!success) {
      throw new NotFoundException(`Event with id ${id} not found`);
    }
    return { message: 'Event deleted successfully' };
  }
}
