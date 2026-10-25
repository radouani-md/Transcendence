import { IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";


export class PostDto {
    
    @MaxLength(250)
    @IsNotEmpty()
    @IsString()
    content: string;
}

export class UpdatePostDto {
    
    @MaxLength(250)
    @IsNotEmpty()
    @IsOptional()
    @IsString()
    content?: string;
}