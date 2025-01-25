import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator";

export class CreateUserDto {
    @ApiProperty({
        description: 'Email of the user',
        example: 'test@xyz.com'
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;
    @ApiProperty({
        description: 'Name of the user',
        example: 'John'
    })
    @IsNotEmpty()
    name: string;
    @ApiProperty({
        description: 'Last name of the user',
        example: 'Doe'
    })
    @IsNotEmpty()
    last_name: string;
    @ApiProperty({
        description: 'Phone number of the user',
        example: '1234567890'
    })
    @IsNotEmpty()
    phone: string;
    @ApiProperty({
        description: 'Password of the user',
        example: 'Password123'
    })
    @IsNotEmpty()
    @IsStrongPassword({
        minLength: 8,
        minNumbers: 1,
        minSymbols: 0,
    })
    password: string;
}