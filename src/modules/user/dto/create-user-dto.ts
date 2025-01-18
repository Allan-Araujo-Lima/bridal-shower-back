import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator";

export class CreateUserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    last_name: string;
    @IsNotEmpty()
    phone: string;
    @IsNotEmpty()
    @IsStrongPassword({
        minLength: 8,
        minNumbers: 1,
        minSymbols: 0,
    })
    password: string;
}