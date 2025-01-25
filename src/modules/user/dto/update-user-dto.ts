import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString } from "class-validator";

export class UpdateUserDto {
    @ApiProperty({ description: 'Name of the user', example: 'John' })
    @IsString()
    @IsOptional()
    name?: string;

    @ApiProperty({ description: 'email of the user', example: 'example@xyz.com' })
    @IsEmail()
    @IsOptional()
    email?: string;

    @ApiProperty({ description: 'Password of the user', example: 'Password123' })
    @IsString()
    @IsOptional()
    password?: string;
}