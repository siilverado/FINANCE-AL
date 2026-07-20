import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';

export class CreateSportsComplexDTO {
  @IsEmail()
  email?: string;

  @IsNotEmpty()
  @Length(3, 60)
  address: string;

  @IsNotEmpty()
  @Length(3, 60)
  phone: string;

  @IsNotEmpty()
  @Length(3, 60)
  name: string;

  @Length(10, 500)
  description: string;

  @IsNotEmpty()
  image: string[];

  grills?: boolean;
  locker?: boolean;
  showers?: boolean;
  bathrooms?: boolean;
  restobar?: boolean;
  parking?: boolean;
}
