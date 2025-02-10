import { Controller, Get, Post, Body, Param, Patch, UseInterceptors, Request, UploadedFile, Delete } from '@nestjs/common';
import { SugestionsService } from './sugestions.service';
import { CreateSugestion } from './dto/create-sugestion.dto';
import { UpdateSugestion } from './dto/update-sugestion.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('sugestions')
@Controller('sugestions')
export class SugestionsController {
    constructor(private readonly sugestionsService: SugestionsService) { }

    @ApiResponse({
        status: 200,
        description: 'Sugestions taken',
    })
    @Get()
    findAll() {
        return this.sugestionsService.findAll();
    }

    @ApiResponse({
        status: 200,
        description: 'Suggestion taken by event'
    })
    @Get(':eventID')
    findAllByEvent(@Param('eventID') eventID: string) {
        return this.sugestionsService.findAllByEvent(eventID);
    }

    @ApiResponse({
        status: 200,
        description: 'Suggestions taken by guest',
    })
    @Get('guest/:guest')
    findAllByGuest(@Param('guest') guest: string) {
        return this.sugestionsService.findAllByGuest(guest);
    }

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

        this.sugestionsService.uploadFile(file, sugestionId, userID);

        return sugestion;
    }

    @ApiResponse({
        status: 200,
        description: 'Sugestion updated'
    })
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateSugestion: UpdateSugestion) {
        return this.sugestionsService.update(id, updateSugestion)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.sugestionsService.remove(id)
    }
}