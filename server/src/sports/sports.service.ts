import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsSelect, Repository } from 'typeorm';

import { CreateSportDto } from './dto/create-sport.dto';
import { UpdateSportDto } from './dto/update-sport.dto';
import { Sport } from './entities/sport.entity';

@Injectable()
export class SportsService {
  constructor(
    @InjectRepository(Sport)
    private readonly sportRepository: Repository<Sport>,
  ) {}

  async findAll() {
    const sports = await this.sportRepository.find({
      relations: {
        sportfields: false,
      },
    });
    if (!sports) throw new NotFoundException('Sports not found');
    return sports.map((s) => ({ name: s.name, images: s.images, id: s.id, types: s.types }));
  }

  async findOne(name: string) {
    const sports = await this.sportRepository.find({
      where: { name: name.toLowerCase() },
      relations: {
        sportfields: true,
      },
    });
    if (!sports) throw new NotFoundException('Sport with that name not found');
    return sports.map((s) => ({
      ...s,
      sportfields: s.sportfields.map((sf) => ({
        id: sf.id,
        name: sf.name,
        images: sf.images,
      })),
    }));
  }

  async findOneByName(name: string, selection?: FindOptionsSelect<Sport>) {
    const sport = await this.sportRepository.findOne({
      where: { name },
      select: selection,
    });
    if (!sport) throw new NotFoundException('Sport not found');

    return sport;
  }
}
