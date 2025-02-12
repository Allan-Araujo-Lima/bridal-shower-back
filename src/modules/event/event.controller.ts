import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDTO } from './dto/create-event.dto';
import { UpdateEventDTO } from './dto/update-event.dto';
import { ApiTags, ApiResponse, ApiParam, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('event')
@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) { }

  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    example: {
      "noivo_a1": "teste2",
      "noivo_a2": "Lara",
      "event_name": "Teste",
      "event_date": "01/01/2025",
      "invites": 200,
      "event_type": "Aniversário",
      "user": {
        "id": "acbe8dd0-fdd5-41c6-b584-84b6be2aa4c7",
        "email": "allanvoide@outlook.com",
        "name": "Eden",
        "last_name": "TesteAws",
        "is_active": false,
        "expiration_date": "2025-01-01T20:37:15.589Z",
        "created_at": "2025-02-02T15:21:45.777Z",
        "updated_at": "2025-02-05T06:00:00.657Z"
      },
      "confirm_presence_until": null,
      "address": null,
      "id": "c2cf970e-c60d-4faf-b79e-0a9770df0118",
      "created_at": "2025-02-10T03:40:23.834Z",
      "updated_at": "2025-02-10T03:40:23.834Z"
    }
  })
  @ApiResponse({
    status: 404,
    description: "Event not fount"
  })
  @Post()
  create(
    @Request() req,
    @Body() createEventDTO: CreateEventDTO
  ) {
    const userId = req.user_data?.sub

    return this.eventService.create(userId, createEventDTO);
  }

  @ApiResponse({
    status: 200,
    example: [
      [
        {
          "id": "011e84e8-775b-4521-bde1-5048c967bda8",
          "noivo_a1": "Eden",
          "noivo_a2": "Lara",
          "event_name": "Teste",
          "event_type": "Casamento",
          "event_date": "2025-01-01T03:00:00.000Z",
          "confirm_presence_until": null,
          "invites": 200,
          "address": null,
          "created_at": "2025-02-06T05:44:27.501Z",
          "updated_at": "2025-02-06T05:44:27.501Z"
        },
        {
          "id": "ef20ba7e-5aaa-43de-9a5e-508021719062",
          "noivo_a1": "teste2",
          "noivo_a2": "Lara",
          "event_name": "Teste",
          "event_type": "Aniversário",
          "event_date": "2025-01-01T03:00:00.000Z",
          "confirm_presence_until": null,
          "invites": 200,
          "address": null,
          "created_at": "2025-02-06T05:46:20.640Z",
          "updated_at": "2025-02-06T05:46:20.640Z"
        }
      ],
      2
    ]
  })
  @ApiResponse({
    status: 404,
    description: "Events not found"
  })
  @Get()
  findAll() {
    return this.eventService.findAll();
  }

  @ApiResponse({
    status: 200,
    example: [
      {
        "id": "fa77c35c-9fa0-4ed4-95f9-02438afd817f",
        "noivo_a1": "Teste",
        "noivo_a2": "Teste",
        "event_name": "Event",
        "event_type": "Festa de Noivado",
        "event_date": "2025-01-01T03:00:00.000Z",
        "confirm_presence_until": null,
        "invites": 500,
        "address": null,
        "created_at": "2025-02-10T18:30:29.702Z",
        "updated_at": "2025-02-10T18:30:29.702Z",
        "user": {
          "id": "acbe8dd0-fdd5-41c6-b584-84b6be2aa4c7",
          "email": "allanvoide@outlook.com",
          "name": "Eden",
          "last_name": "TesteAws",
          "is_active": false,
          "expiration_date": "2025-01-01T20:37:15.589Z",
          "created_at": "2025-02-02T15:21:45.777Z",
          "updated_at": "2025-02-05T06:00:00.657Z"
        }
      },
      {
        "id": "757a9565-d017-4306-88ca-6cc5ac098f16",
        "noivo_a1": "Teste2",
        "noivo_a2": "Teste2",
        "event_name": "Event2",
        "event_type": "Aniversário",
        "event_date": "2025-01-01T03:00:00.000Z",
        "confirm_presence_until": null,
        "invites": 50,
        "address": null,
        "created_at": "2025-02-10T18:30:52.722Z",
        "updated_at": "2025-02-10T18:30:52.722Z",
        "user": {
          "id": "acbe8dd0-fdd5-41c6-b584-84b6be2aa4c7",
          "email": "allanvoide@outlook.com",
          "name": "Eden",
          "last_name": "TesteAws",
          "is_active": false,
          "expiration_date": "2025-01-01T20:37:15.589Z",
          "created_at": "2025-02-02T15:21:45.777Z",
          "updated_at": "2025-02-05T06:00:00.657Z"
        }
      }
    ]
  })
  @ApiOperation({
    description: 'Find all events with the logged user'
  })
  @Get('user')
  findAllByUSer(@Request() req) {
    return this.eventService.findAllByUser(req)
  }

  @ApiParam({
    name: 'id',
    description: 'id of the event'
  })
  @ApiResponse({
    status: 200,
    example: {
      "id": "011e84e8-775b-4521-bde1-5048c967bda8",
      "noivo_a1": "Eden",
      "noivo_a2": "Lara",
      "event_name": "Teste",
      "event_type": "Casamento",
      "event_date": "2025-01-01T03:00:00.000Z",
      "confirm_presence_until": null,
      "invites": 200,
      "address": null,
      "created_at": "2025-02-06T05:44:27.501Z",
      "updated_at": "2025-02-06T05:44:27.501Z"
    }
  })
  @ApiResponse({
    status: 404,
    description: "Event not found"
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventService.findOne(id);
  }

  @ApiParam({
    name: 'id',
    description: 'id of the event'
  })
  @ApiResponse({
    status: 200,
    description: "Event updated"
  })
  @ApiResponse({
    status: 404,
    description: "Event not found"
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDTO: UpdateEventDTO) {
    return this.eventService.update(id, updateEventDTO);
  }

  @ApiResponse({
    status: 200,
    description: "Event deleted"
  })
  @ApiResponse({
    status: 404,
    description: "Event not found"
  })
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.eventService.remove(id);
  }
}
