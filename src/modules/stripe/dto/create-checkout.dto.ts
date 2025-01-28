import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, Max, Min } from "class-validator";

export class CreateCheckoutDTO {
    @ApiProperty({
        description: 'Product ID: 1-4',
        example: 1
    })
    @IsNumber()
    @Min(1)
    @Max(4)
    idProduct: number;
}