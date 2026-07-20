import { PartialType } from '@nestjs/mapped-types';

import { CreateSportFieldDto } from './create-sportfield.dto';

export class UpdateSportFieldDto extends PartialType(CreateSportFieldDto) {}
