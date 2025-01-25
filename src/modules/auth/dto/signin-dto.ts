import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class SignInDto {
    @ApiProperty({
        description: 'Email of the user',
        example: 'Teste@xyz.com'
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;
    @ApiProperty({
        description: 'Password of the user',
        example: 'Password123'
    })
    password: string
}