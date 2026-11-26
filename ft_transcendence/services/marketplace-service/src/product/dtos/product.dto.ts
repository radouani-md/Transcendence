import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';



export class ProductDto {


    @MaxLength(30)
    @IsString()
    @IsNotEmpty()
    title: string;

    @Type(() => Number)
    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    price: number


} 