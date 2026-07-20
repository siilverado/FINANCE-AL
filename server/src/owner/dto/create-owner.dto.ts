import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, MinLength } from 'class-validator';

export class CreateOwnerDto {
  @ApiProperty({
    description: 'DNI of the owner',
    example: '3544677234',
    minLength: 5,
  })
  @IsString()
  @MinLength(5)
  DNI: string;

  @ApiProperty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsString()
  phone: string;

  // @ApiProperty()
  // @IsUUID()
  // userId: string;
}
