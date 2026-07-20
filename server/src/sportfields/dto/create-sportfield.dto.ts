import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

export class CreateSportFieldDto {
  @ApiProperty({
    description: 'Name of the SportField',
    example: 'El Fortin',
  })
  @IsString()
  @MinLength(3)
  name: string;
  @ApiProperty({
    description: 'Description of the SportField',
    example: 'Cancha sintetica, cerrada con redes de futbol 5',
  })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({
    description: 'Dimensions of the SportField',
    example: '30x60',
  })
  @IsString()
  dimensions: string;

  @ApiProperty({
    description: 'Images of the SportField',
    example: [
      'https://img.freepik.com/free-vector/scene-with-trees-around-football-field_1308-37115.jpg?w=2000',
    ],
  })
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  images: string[];

  @ApiProperty({
    description: 'sport of the SportField',
    example: 'football',
  })
  @IsString()
  sport: string;

  @ApiProperty({
    description: 'sportfield Type',
    example: 'Polvo de ladrillo',
  })
  @IsString()
  fieldType: string;

  @IsInt()
  @IsPositive()
  capacity: number;
}
