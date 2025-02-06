import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDTO } from './dto/create-event.dto';
import { UpdateEventDTO } from './dto/update-event.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('event')
@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) { }

  @Post()
  create(
    @Param('eventID') eventID: string,
    @Body() createEventDTO: CreateEventDTO
  ) {
    return this.eventService.create(eventID, createEventDTO);
  }

  @Get()
  findAll() {
    return this.eventService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDTO: UpdateEventDTO) {
    return this.eventService.update(id, updateEventDTO);
  }
}
