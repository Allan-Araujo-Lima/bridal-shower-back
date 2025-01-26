import { IsNumber, IsString } from "class-validator";

export class CreateChargeDTO {
    @IsNumber()
    amount: number;
    @IsString()
    currency: string;
    @IsString()
    source: string;
}