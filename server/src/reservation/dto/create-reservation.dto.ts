import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsDate,
  Validate,
  ValidationArguments,
  IsEmail,
  isNotEmpty,
} from 'class-validator';
import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'notPastDate', async: false })
export class NotPastDateConstraint implements ValidatorConstraintInterface {
  validate(date: Date) {
    const now = new Date();
    return date.getTime() >= now.getTime();
  }

  defaultMessage() {
    return 'Date cannot be in the past';
  }
}

@ValidatorConstraint({ name: 'notPastHour', async: false })
export class NotPastHourConstraint implements ValidatorConstraintInterface {
  validate(hour: number) {
    const now = new Date();
    return hour >= now.getHours();
  }

  defaultMessage(): string {
    return 'test';
  }
}

export class CreateReservationDto {
  @IsNotEmpty()
  sportfieldId: string;

  @IsNotEmpty()
  // @Validate(NotPastHourConstraint)
  hour: number;

  @Transform(({ value }: { value: string }) => {
    const dateString = value.split('/');
    return new Date(`${dateString[1]}/${dateString[0]}/${dateString[2]}`);
  })
  @IsDate()
  @IsNotEmpty()
  @Validate(NotPastDateConstraint)
  date: Date;

  @IsEmail()
  userEmail: string;
}
