import { IsString, IsUUID, MinLength } from 'class-validator';

export class CreateOwnerDto {
  @IsString()
  @MinLength(5)
  DNI: string;
  @IsString()
  address: string;
  @IsString()
  phone: string;
  @IsUUID()
  userId: string;
}
