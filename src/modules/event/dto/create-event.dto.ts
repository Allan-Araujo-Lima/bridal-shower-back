import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class CreateEventDTO {
    @ApiProperty({
        description: "Nome do noivo ou noiva 1",
        example: "Marcia"
    })
    noivo_a1: string;

    @ApiProperty({
        description: "Nome do noivo ou noiva 2",
        example: "Luiz"
    })
    noivo_a2: string;

    @ApiProperty({
        description: "Nome da cerimonia ou festa",
        example: "Casamneto encantado",
    })
    @IsOptional()
    wedding_name: string;

    @ApiProperty({
        description: "Data em que ou casamento ou festa de noivado irá acontecer",
        example: "12/01/2025",
        type: Date
    })
    wedding_date: Date;

    @ApiProperty({
        description: "Caso o usuário queria, ele pode estipular uma data limite para realizar a confirmação ao casamento ou festa de noivado",
        example: "20/05/2025",
        type: Date,
        nullable: true
    })
    @IsOptional()
    confirm_presence_until: Date;
}
