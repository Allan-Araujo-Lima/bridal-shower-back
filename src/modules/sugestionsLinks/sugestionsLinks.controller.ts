import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { SugestionsLinksService } from "./sugestionsLinks.service";
import { ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateSugestionsLinks } from "./dto/create-sugestionsLinks.dto";

@ApiTags('sugestions_url')
@Controller('sugestions_url')
export class SugestionsLinksController {
    constructor(private readonly sugestionsLinksService: SugestionsLinksService) { }

    @ApiParam({
        name: 'id',
        description: 'Suggestion id that suggestion_url will be related'
    })
    @ApiResponse({
        status: 201,
        description: 'SuggestionsURL has been created',
    })
    @Post(':id')
    create(@Param(`id`) id: string, @Body() createSugestionsLinksDTO: CreateSugestionsLinks) {
        return this.sugestionsLinksService.create(id, createSugestionsLinksDTO)
    }

    @ApiParam({
        name: 'id',
        description: 'Suggestion id that links must to be taken'
    })
    @ApiResponse({
        status: 200,
        example: [
            {
                "id": "bfb381fa-81df-4ae4-978d-669af97807f5",
                "name": "Amazon",
                "url": "https://www.amazon.com.br/Lumin%C3%A1ria-Mesa-Abajur-Vintage-Preto/dp/B09K4KZMZ8/?_encoding=UTF8&pd_rd_w=vgmft&content-id=amzn1.sym.563c2077-c7fc-41b7-9805-9416691ba18b&pf_rd_p=563c2077-c7fc-41b7-9805-9416691ba18b&pf_rd_r=1EM1S5J1RVGPDVJ71NK9&pd_rd_wg=cN3Bn&pd_rd_r=32a8cbf3-a323-4332-884c-8e1c32f14aa3&ref_=pd_hp_d_atf_dealz_cs_t2&th=1",
                "suggestion": {
                    "id": "20c65ef7-b0ee-4e8a-b6ac-997e1c9dcf84",
                    "name": "doidoo",
                    "description": "awsfolder",
                    "category": "quarto",
                    "guest": null
                }
            },
            {
                "id": "25274f05-6e9b-4430-bc3f-151b3fedd794",
                "name": "Amazon22",
                "url": "https://www.amazon.com.br/Lumin%C3%A1ria-Mesa-Abajur-Vintage-Preto/dp/B09K4KZMZ8/?_encoding=UTF8&pd_rd_w=vgmft&content-id=amzn1.sym.563c2077-c7fc-41b7-9805-9416691ba18b&pf_rd_p=563c2077-c7fc-41b7-9805-9416691ba18b&pf_rd_r=1EM1S5J1RVGPDVJ71NK9&pd_rd_wg=cN3Bn&pd_rd_r=32a8cbf3-a323-4332-884c-8e1c32f14aa3&ref_=pd_hp_d_atf_dealz_cs_t2&th=1",
                "suggestion": {
                    "id": "20c65ef7-b0ee-4e8a-b6ac-997e1c9dcf84",
                    "name": "doidoo",
                    "description": "awsfolder",
                    "category": "quarto",
                    "guest": null
                }
            }
        ],
        description: 'SuggestionsURL taken by suggestion'
    })
    @Get(':id')
    findAllBySuggestion(@Param('id') id: string) {
        return this.sugestionsLinksService.findAllBySugestion(id)
    }

    @ApiResponse({
        status: 200,
        example: [
            {
                "id": "bfb381fa-81df-4ae4-978d-669af97807f5",
                "name": "Amazon",
                "url": "https://www.amazon.com.br/Lumin%C3%A1ria-Mesa-Abajur-Vintage-Preto/dp/B09K4KZMZ8/?_encoding=UTF8&pd_rd_w=vgmft&content-id=amzn1.sym.563c2077-c7fc-41b7-9805-9416691ba18b&pf_rd_p=563c2077-c7fc-41b7-9805-9416691ba18b&pf_rd_r=1EM1S5J1RVGPDVJ71NK9&pd_rd_wg=cN3Bn&pd_rd_r=32a8cbf3-a323-4332-884c-8e1c32f14aa3&ref_=pd_hp_d_atf_dealz_cs_t2&th=1"
            },
            {
                "id": "25274f05-6e9b-4430-bc3f-151b3fedd794",
                "name": "Amazon22",
                "url": "https://www.amazon.com.br/Lumin%C3%A1ria-Mesa-Abajur-Vintage-Preto/dp/B09K4KZMZ8/?_encoding=UTF8&pd_rd_w=vgmft&content-id=amzn1.sym.563c2077-c7fc-41b7-9805-9416691ba18b&pf_rd_p=563c2077-c7fc-41b7-9805-9416691ba18b&pf_rd_r=1EM1S5J1RVGPDVJ71NK9&pd_rd_wg=cN3Bn&pd_rd_r=32a8cbf3-a323-4332-884c-8e1c32f14aa3&ref_=pd_hp_d_atf_dealz_cs_t2&th=1"
            }
        ]
    })
    @Get()
    findAll() {
        return this.sugestionsLinksService.findAll()
    }
}
