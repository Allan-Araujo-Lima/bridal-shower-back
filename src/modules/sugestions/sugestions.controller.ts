import { Controller, Get, Post, Body, Param, Patch, UseInterceptors, Request, UploadedFile } from '@nestjs/common';
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
        description: 'Suggestion taken by user'
    })
    @Get('user')
    findAllByUser(@Request() req) {
        const userId = req.user_data?.sub;
        return this.sugestionsService.findAllByUser(userId);
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
    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async create(
        @Request() req,
        @Body() createSugestionDto: CreateSugestion,
        @UploadedFile() file: Express.Multer.File
    ) {
        const userId = req.user_data?.sub;
        const sugestion = await this.sugestionsService.create(userId, createSugestionDto);

        const sugestionId = sugestion['id'];

        this.sugestionsService.uploadFile(file, sugestionId);

        return sugestion;
    }

    @ApiResponse({
        status: 200,
        description: 'Sugestion updated',
    })
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateSugestion: UpdateSugestion) {
        return this.sugestionsService.update(id, updateSugestion)
    }
}