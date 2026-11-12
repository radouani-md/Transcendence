import { IsNotEmpty, IsString, MaxLength } from "class-validator";


export class CommentDto {

    @MaxLength(250)
    @IsNotEmpty()
    @IsString()
    content: string;
}