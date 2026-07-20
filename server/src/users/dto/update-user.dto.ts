import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';

import { RegisterUserDTO } from './register-dto';

export class UpdateUserDTO extends PartialType(RegisterUserDTO) {
  @IsEmail()
  email?: string;

  @IsNotEmpty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
  password: string;

  @Length(3, 40)
  fullName?: string;
}
