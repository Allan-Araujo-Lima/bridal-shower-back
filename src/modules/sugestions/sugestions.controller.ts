import { Controller, Get, Post, Body, Put, Param, Patch } from '@nestjs/common';
import { SugestionsService } from './sugestions.service';
import { UpdateSugestion } from './dto/update-sugestion.dto';

@Controller('sugestions')
export class SugestionsController {
    constructor(private readonly sugestionsService: SugestionsService) { }

    @Get()
    findAll() {
        return this.sugestionsService.findAll();
    }

    @Post()
    create(@Body() createSugestionDto: any) {
        return this.sugestionsService.create(createSugestionDto);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateSugestion: UpdateSugestion) {
        return this.sugestionsService.update(id, updateSugestion)
    }
}
