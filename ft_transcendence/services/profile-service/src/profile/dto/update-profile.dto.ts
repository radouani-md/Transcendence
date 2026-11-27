
import {
  IsString,
  IsOptional,
  IsNotEmpty,
  MinLength,
} from 'class-validator';

export class UpdateProfileDto {

  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @IsOptional()
  @IsString()
  coverUrl?: string;
}
