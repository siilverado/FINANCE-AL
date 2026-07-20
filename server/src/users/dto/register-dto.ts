import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';

export class RegisterUserDTO {

  @ApiProperty({
    description:"Must be email type.",
    example:"test1@gmail.com",
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;
  
  @ApiProperty({
    description:"The password must have more than 8 characters.",
    example:'12345Test'
  })
  @IsNotEmpty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
  password: string;
  
  @ApiProperty({
    description:"Firstname of the user",
    example:"Juan"
  })
  @IsNotEmpty()
  @Length(3, 40)
  firstName: string;
  
  @ApiProperty({
    description:"Lastname of the user",
    example:"Gonzales"
  })
  @IsNotEmpty()
  @Length(3, 40)
  lastName: string;
}
export class LoginUserDTO {
    
  @ApiProperty({
    description: "The email of the user register",
    example:"test1@gmail.com",
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;
  
  @ApiProperty({
    description:"The password must have more than 8 characters.",
    example:'12345Test'
  })
  @IsNotEmpty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
  password: string;
}
