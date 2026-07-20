import { IsArray, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateSportFieldDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  description: string;

  @IsString()
  dimensions: string;

  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  images: string[];

  @IsString()
  sport: string;
}
