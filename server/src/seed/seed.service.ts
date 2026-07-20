import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SportField } from 'src/sportfields/entities/sportfield.entity';
import { Sport } from 'src/sports/entities/sport.entity';
import { Repository } from 'typeorm';

import { initialData } from './data/seed-data';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Sport)
    private readonly sportRepository: Repository<Sport>,
    @InjectRepository(SportField)
    private readonly sportfieldsRepository: Repository<SportField>,
  ) {}

  async runSeed() {
    await this.deleteAll();
    await this.sportRepository
      .createQueryBuilder('sport')
      .insert()
      .values(initialData.sports)
      .execute();

    await this.sportfieldsRepository
      .createQueryBuilder('sportfield')
      .insert()
      .values(initialData.sportfields)
      .execute();
  }

  async deleteAll() {
    await this.sportRepository.createQueryBuilder('sport').delete().where({}).execute();
    await this.sportfieldsRepository.createQueryBuilder('sportfield').delete().where({}).execute();
  }
}
