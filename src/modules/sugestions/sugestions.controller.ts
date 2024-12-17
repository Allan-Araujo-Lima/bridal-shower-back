import { Controller, Get, Post, Body } from '@nestjs/common';
import { SugestionsService } from './sugestions.service';

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
}
