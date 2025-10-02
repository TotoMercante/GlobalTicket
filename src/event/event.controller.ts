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

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  async getAll() {
    return this.eventService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    const event = await this.eventService.getById(id);
    if (!event) {
      throw new NotFoundException(`Event with id ${id} not found`);
    }
    return event;
  }

  @Post()
  async create(@Body() event: CreateEventDto) {
    return this.eventService.create(event);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: UpdateEventDto) {
    const event = await this.eventService.updateEvent(id, data);
    if (!event) {
      throw new NotFoundException(`Event with id ${id} not found`);
    }
    return event;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const success = await this.eventService.deleteEvent(id);
    if (!success) {
      throw new NotFoundException(`Event with id ${id} not found`);
    }
    return { message: 'Event deleted successfully' };
  }
}
