
import {
  IsString,
  IsOptional,
} from 'class-validator';

export class UpdateBioDto {

  @IsOptional()
  @IsString()
  bio?: string;

}