import { PartialType } from '@nestjs/mapped-types';
import { Length } from 'class-validator';

import { CreateSportsComplexDTO } from './create-sports-complex.dto';

export class UpdateSportsComplexDTO extends PartialType(CreateSportsComplexDTO) {
  address?: string;
  phone?: string;
  name?: string;
  image?: string[];
}
