import { Transform } from 'class-transformer';
import { IsNotEmpty, IsDate, Validate } from 'class-validator';
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

export class CreateReservationDto {
  // @IsNotEmpty()
  // start_time: number;

  // @IsNotEmpty()
  // end_time: number;

  // @IsNotEmpty()
  // day: number;

  // @IsNotEmpty()
  // mounth: number;

  // @IsNotEmpty()
  // year: number;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  @IsNotEmpty()
  @Validate(NotPastDateConstraint)
  date: Date;
}
