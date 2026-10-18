import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Length, MaxLength, MinLength } from "class-validator";
import { Role } from "../../generated/prisma/enums.js";

export class LoginDto {
    @IsEmail()
    @MaxLength(250)
    @IsNotEmpty()
    email: string;
    
    @IsString()
    @MinLength(10)
    @IsNotEmpty()
    password: string;

}