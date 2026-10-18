import { IsNotEmpty, IsOptional, IsString, IsUrl, isURL, MaxLength } from "class-validator";


export  class ClubDto {
    
    @IsNotEmpty()
    @MaxLength(30)
    @IsString()
    title: string;
    
    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsString()
    @IsUrl()
    logoUrl?:  string;

    @IsOptional()
    @IsString()
    @IsUrl()
    coverUrl?: string;
}