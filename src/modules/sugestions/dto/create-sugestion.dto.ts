import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, IsUrl } from "class-validator";

export class CreateSugestion {
    @ApiProperty({
        description: 'Name of the sugestion',
        example: 'Liquidificador'
    })
    @IsString()
    name: string;
    @ApiProperty({
        description: 'Description of the sugestion',
        example: 'Liquidificador de 1000W para fazer deliciosos sucos'
    })
    @IsString()
    @IsOptional()
    description: string;
    @ApiProperty({
        description: 'Category of the sugestion',
        example: 'Cozinha'
    })
    @IsString()
    category: string;
    @ApiProperty({
        description: 'URLs for another webpages to guest buy the suggestion',
        example: 'https://amazon.com/fone'
    })
    @IsUrl()
    @IsOptional()
    url: string
}