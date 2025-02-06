import { IsNumber, Max, Min } from "class-validator";

export class CreateCheckoutDTO {
    @IsNumber()
    @Min(1)
    @Max(4)
    idProduct: number;
}