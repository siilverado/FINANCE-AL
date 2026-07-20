import {
  IsEmail,
  IsArray,
  IsNotEmpty,
  Length,
  Matches,
  IsOptional,
  IsBoolean,
  IsNumber,
} from 'class-validator';

import { CreateAvailabilityRange } from './create-availability-range.dto';
import { AvailabilityRange } from '../entities/availability-range.entity';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSportsComplexDTO {
  @ApiProperty({ example: 'complexname@gmail.com' })
  @IsEmail()
  email?: string;

  @ApiProperty({
    description: 'Address of the Complex',
    maxLength: 200,
    minLength: 3,
    example: 'Av. Fuerza Aerea Argentina 3712',
  })
  @IsNotEmpty()
  @Length(3, 200)
  address: string;

  @ApiProperty({
    description: 'Phone of the Complex',
    maxLength: 60,
    minLength: 3,
    example: '(0351) 155 68 7890',
  })
  @IsNotEmpty()
  @Length(3, 60)
  phone: string;

  @ApiProperty({
    description: 'Name of the Complex',
    example: 'Complejo Deportivo Quality',
    maxLength: 60,
    minLength: 3,
  })
  @IsNotEmpty()
  @Length(3, 60)
  name: string;

  @ApiProperty({
    description: 'Brief description of the complex',
    example: 'Un lugar con todas las comodidades para el deportista amateur.',
  })
  @Length(10, 500)
  @IsOptional()
  description: string;

  /// TODO: Add validation for lat and lng
  @IsNumber()
  @IsOptional()
  lat: number;

  @IsNumber()
  @IsOptional()
  lng: number;

  @ApiProperty({
    description: 'Images of the complex',
    example:
      'https://img.freepik.com/fotos-premium/complejo-deportivo-centro-minsk-canchas-deportivas-al-aire-libre-juegos-bielorrusia_217593-15330.jpg?w=360',
  })
  images: string[];

  @IsArray()
  availability?: CreateAvailabilityRange[];

  @ApiPropertyOptional({ default: false })
  @IsBoolean()
  @IsOptional()
  grills?: boolean;
  @ApiPropertyOptional({ default: false })
  @IsBoolean()
  @IsOptional()
  locker?: boolean;
  @ApiPropertyOptional({ default: false })
  @IsBoolean()
  @IsOptional()
  showers?: boolean;
  @ApiPropertyOptional({ default: false })
  @IsBoolean()
  @IsOptional()
  bathrooms?: boolean;
  @ApiPropertyOptional({ default: false })
  @IsBoolean()
  @IsOptional()
  restobar?: boolean;
  @ApiPropertyOptional({ default: false })
  @IsBoolean()
  @IsOptional()
  parking?: boolean;
}
