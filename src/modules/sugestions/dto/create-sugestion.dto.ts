import { IsOptional, IsString } from "class-validator";

export class CreateSugestion {
    @IsString()
    name: string;
    @IsString()
    @IsOptional()
    description: string;
    @IsString()
    category: string;
    @IsString()
    guest: string
}