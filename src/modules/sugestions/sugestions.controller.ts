import { Controller, Get, Post, Body, Param, Patch, UseInterceptors, Request, UploadedFile, Delete } from '@nestjs/common';
import { SugestionsService } from './sugestions.service';
import { CreateSugestion } from './dto/create-sugestion.dto';
import { UpdateSugestion } from './dto/update-sugestion.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/public.decorator';
import { InsertImageMapper } from 'src/utils/mappers/insert-images.mapper';

@ApiTags('sugestions')
@Controller('sugestions')
export class SugestionsController {
    constructor(private readonly sugestionsService: SugestionsService) { }

    @ApiResponse({
        status: 200,
        example: [
            {
                "id": "20c65ef7-b0ee-4e8a-b6ac-997e1c9dcf84",
                "name": "doidoo",
                "description": "awsfolder",
                "category": "quarto",
                "guest": "teste"
            },
            {
                "id": "252cc034-c68b-4f8d-9761-118b4ee79e73",
                "name": "testevent",
                "description": "testevent",
                "category": "Banheiro",
                "guest": "teste"
            },
            {
                "id": "c609ec31-fe93-42c5-bf25-f82a5cb09431",
                "name": "testevent",
                "description": "testevent",
                "category": "Banheiro",
                "guest": "marta"
            },
            {
                "id": "17294f71-faf1-46e0-b55b-c4e7a615f351",
                "name": "TesteLista",
                "description": "TesteLista",
                "category": "Quarto",
                "guest": "teste"
            }
        ],
    })
    @Get()
    findAll() {
        return this.sugestionsService.findAll();
    }


    @ApiParam({
        name: 'eventID',
        description: 'Event ID'
    })
    @ApiResponse({
        status: 200,
        example:
            [
                {
                    "id": "20c65ef7-b0ee-4e8a-b6ac-997e1c9dcf84",
                    "name": "doidoo",
                    "description": "awsfolder",
                    "category": "quarto",
                    "guest": null,
                    "event": {
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
                        "updated_at": "2025-02-10T05:05:41.857Z"
                    }
                }
            ]
    })
    @ApiOperation({
        summary: "public",
        description: "Returns all the suggestions at a certain event"
    })
    @Public()
    @Get(':eventID')
    @UseInterceptors(InsertImageMapper)
    findAllByEvent(@Param('eventID') eventID: string) {
        return this.sugestionsService.findAllByEvent(eventID);
    }

    @ApiParam({
        name: 'eventID',
        description: 'ID of the event'
    })
    @ApiParam({
        name: "guest",
        description: 'Guest of the event'
    })
    @ApiResponse({
        status: 200,
        example: [
            {
                "id": "fbb9045b-3770-4ee7-a4df-ca7dd30f8a1c",
                "name": "TesteLista",
                "description": "TesteLista",
                "category": "Quarto",
                "guest": null,
                "event": {
                    "id": "b9b34e55-ec28-4758-965e-aa939c32ebaf",
                    "user": {
                        "id": "b4e9919c-46d0-4307-a747-6e2cf0599b6a"
                    }
                },
                "imageUrl": "https://wedding-now.s3.us-east-2.amazonaws.com/b4e9919c-46d0-4307-a747-6e2cf0599b6a/b9b34e55-ec28-4758-965e-aa939c32ebaf/fbb9045b-3770-4ee7-a4df-ca7dd30f8a1c"
            }
        ]
    })
    @ApiResponse({
        status: 404,
        description: 'Event not found'
    })
    @ApiOperation({
        summary: "public",
        description: "Return all the times that a certain guest appears on a event"
    })
    @Public()
    @Get(':eventID/:guest')
    findAllByGuest(@Param('eventID') eventID: string, @Param('guest') guest: string) {
        return this.sugestionsService.findAllByGuest(eventID, guest);
    }

    @ApiParam({
        name: 'eventID',
        description: 'ID of the event that suggestion must to be related'
    })
    @ApiResponse({
        status: 200,
        description: 'Sugestion created',
    })
    @Post(':eventID')
    @UseInterceptors(FileInterceptor('file'))
    async create(
        @Request() req,
        @Param('eventID') eventID: string,
        @Body() createSugestionDto: CreateSugestion,
        @UploadedFile() file: Express.Multer.File
    ) {
        const userID = req.user_data?.sub;
        const sugestion = await this.sugestionsService.create(eventID, userID, createSugestionDto);

        const sugestionId = sugestion['id'];

        const folderName = `${userID}/${eventID}`

        this.sugestionsService.uploadFile(file, sugestionId, folderName);

        return sugestion;
    }

    @ApiResponse({
        status: 200,
        description: 'Suggestion updated'
    })
    @ApiResponse({
        status: 404,
        description: 'Suggestion not found'
    })
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateSugestion: UpdateSugestion) {
        return this.sugestionsService.update(id, updateSugestion)
    }

    @ApiResponse({
        status: 200,
        description: 'Suggestion deleted'
    })
    @ApiResponse({
        status: 404,
        description: 'Suggestion not found'
    })
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.sugestionsService.remove(id)
    }
}