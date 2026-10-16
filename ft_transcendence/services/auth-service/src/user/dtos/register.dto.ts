import { IsEmail, IsNotEmpty, IsOptional, IsString, Length, MaxLength, MinLength } from "class-validator";

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
}