import { Controller, Get, Post, Body, Put, Param, Patch, UseInterceptors, Request, UploadedFile } from '@nestjs/common';
import { SugestionsService } from './sugestions.service';
import { CreateSugestion } from './dto/create-sugestion.dto';
import { UpdateSugestion } from './dto/update-sugestion.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('sugestions')
export class SugestionsController {
    constructor(private readonly sugestionsService: SugestionsService) { }

    @Get()
    findAll() {
        return this.sugestionsService.findAll();
    }

    @Get(':guest')
    findAllByGuest(@Param('guest') guest: string) {
        return this.sugestionsService.findAllByGuest(guest);
    }

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async create(
        @Body() createSugestionDto: CreateSugestion,
        @UploadedFile() file: Express.Multer.File
    ) {
        const sugestion = await this.sugestionsService.create(createSugestionDto);

        const sugestionId = sugestion['id'];

        this.sugestionsService.uploadFile(file, sugestionId);

        return sugestion;
    }
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateSugestion: UpdateSugestion) {
        return this.sugestionsService.update(id, updateSugestion)
    }
}