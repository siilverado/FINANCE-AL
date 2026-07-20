import { PartialType } from '@nestjs/swagger';

import { IsEmail, IsNotEmpty, IsOptional, Length, Matches } from 'class-validator';

import { RegisterUserDTO } from './register-dto';
import { BeforeUpdate } from 'typeorm';

export class UpdateUserDTO extends PartialType(RegisterUserDTO) {
  @IsEmail()
  email?: string;

  // @IsOptional()
  // @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
  // password: string;

  @Length(3, 40)
  firstName?: string;

  @Length(3, 40)
  lastName?: string;

  @IsOptional()
  image?: string;
}
