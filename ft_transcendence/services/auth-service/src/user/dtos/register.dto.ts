import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Length, MaxLength, MinLength } from "class-validator";
import { Role } from '../../generated/prisma/enums.js';

export class RegisterDto {
    @IsEmail()
    @MaxLength(250)
    @IsNotEmpty()
    email: string;
    
    @IsString()
    @MinLength(10)
    @IsNotEmpty()
    password: string;
    
    @IsOptional()
    @IsString()
    @Length(2, 100)
    username: string;

    @IsEnum(Role)
    @IsNotEmpty()
    role:   Role;
}