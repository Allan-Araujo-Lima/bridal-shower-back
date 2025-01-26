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
    @ApiProperty({
        description: 'Is the user active',
        example: false
    })
    is_active: boolean;
    @ApiProperty({
        description: 'Expiration date of the user',
        example: '2022-12-31'
    })
    expiration_date: Date;
}