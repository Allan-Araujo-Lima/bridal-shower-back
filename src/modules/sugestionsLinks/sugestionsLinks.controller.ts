import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { SugestionsLinksService } from "./sugestionsLinks.service";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateSugestionsLinks } from "./dto/create-sugestionsLinks.dto";

@ApiTags('sugestions_url')
@Controller('sugestions_url')
export class SugestionsLinksController {
    constructor(private readonly sugestionsLinksService: SugestionsLinksService) { }

    @ApiResponse({
        status: 201,
        description: 'SuggestionsURL has been created',
    })
    @Post(':id')
    create(@Param(`id`) id: string, @Body() createSugestionsLinksDTO: CreateSugestionsLinks) {
        return this.sugestionsLinksService.create(id, createSugestionsLinksDTO)
    }

    @ApiResponse({
        status: 200,
        description: 'SuggestionsURL taken by suggestion'
    })
    @Get(':id')
    findAllBySuggestion(@Param('id') id: string) {
        return this.sugestionsLinksService.findAllBySugestion(id)
    }
}
