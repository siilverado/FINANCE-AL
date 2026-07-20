import { IsInt, IsPositive, Max, Min } from 'class-validator';

export class CreateAvailabilityRange {
  @IsInt()
  @IsPositive()
  @Max(23)
  start_hour: number;

  @IsInt()
  @IsPositive()
  @Max(24)
  @Min(1)
  end_hour: number;
}
