import { Transform } from 'class-transformer';
import { IsDate, IsNotEmpty } from 'class-validator';
import { parseDate } from 'src/utils/date';

export class GetDayAvailabilityDto {
  @Transform(({ value }) => parseDate(value))
  @IsDate()
  @IsNotEmpty()
  date: Date;
}
