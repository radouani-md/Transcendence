import { IsEnum, IsNotEmpty, IsString, MaxLength } from "class-validator";
import { MediaType } from "../../generated/prisma/enums.js";


export class PostDto {
    
    @MaxLength(250)
    @IsNotEmpty()
    @IsString()
    content: string;
}