import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDTO } from './dto/create-event.dto';
import { UpdateEventDTO } from './dto/update-event.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('event')
@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) { }

  @Post()
  create(
    @Request() req,
    @Body() createEventDTO: CreateEventDTO
  ) {
    const userId = req.user_data?.sub
    return this.eventService.create(userId, createEventDTO);
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

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.eventService.remove(id);
  }
}
