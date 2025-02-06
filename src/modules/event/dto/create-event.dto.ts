import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class CreateEventDTO {
    @IsOptional()
    @ApiProperty({
        description: "Nome do noivo ou noiva 1 | Use em caso de festa de noivado ou casamento",
        example: "Marcia",
        nullable: true,
    })
    noivo_a1: string;

    @IsOptional()
    @ApiProperty({
        description: "Nome do noivo ou noiva 2 | Use em caso de festa de noivado ou casamento",
        example: "Luiz",
        nullable: true
    })
    noivo_a2: string;

    @IsOptional()
    @ApiProperty({
        description: "Nome da cerimonia ou festa",
        example: "Casamneto encantado",
    })
    event_name: string;

    @ApiProperty({
        description: "Tipo do evento"
    })
    event_type: string;

    @ApiProperty({
        description: "Data em que o evento irá acontecer",
        example: "12/01/2025",
        type: Date
    })
    event_date: Date;

    @ApiProperty({
        description: "Caso o usuário queria, ele pode estipular uma data limite para realizar a confirmação ao casamento ou festa de noivado",
        example: "20/05/2025",
        type: Date,
        nullable: true
    })
    @IsOptional()
    confirm_presence_until: Date;

    @ApiProperty({
        description: "Número de convidados totais",
        example: 200,
        type: "number",
    })
    invites: Number;
}
