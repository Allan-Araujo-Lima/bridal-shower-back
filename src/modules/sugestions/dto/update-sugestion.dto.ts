import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class UpdateSugestion {
    @ApiProperty({
        description: 'Name of the sugestion',
        example: 'Liquidificador'
    })
    @IsString()
    name: string;
    @ApiProperty({
        description: 'Description of the sugestion',
        example: 'Liquidificador de 1000W para fazer deliciosos sucos',
        nullable: true
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
        description: 'Guest of the event',
        example: 'Marcos'
    })
    @IsString()
    guest: string
}