import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SportsService } from 'src/sports/sports.service';
import { Repository } from 'typeorm';

import { CreateSportFieldDto, UpdateSportFieldDto } from './dto';
import { SportField } from './entities/sportfield.entity';

@Injectable()
export class SportfieldsService {
  constructor(
    @InjectRepository(SportField)
    private readonly sportFieldRepository: Repository<SportField>,
    private readonly sportService: SportsService,
  ) {}

  async findAll() {
    const allSportfields = await this.sportFieldRepository.find({
      relations: {
        sport: true,
      },
    });
    if (!allSportfields) throw new NotFoundException('SportField not found');
    return allSportfields.map((sf) => ({
      ...sf,
      sport: sf.sport.name,
    }));
  }
  async findWithSport(sport: string) {
    const allSportfields = await this.sportFieldRepository.find({
      where:{
        sport: {
          name: sport
        }
      },
      relations: {
        sport: true,
      },
    });
    if (!allSportfields.length) throw new NotFoundException('SportField not found');
    return allSportfields.map((sf) => ({
      ...sf,
      sport: sf.sport.name,
    }));
  }

  async findOne(id: string) {
    const sportfield = await this.sportFieldRepository.findOneBy({ id });
    if (!sportfield) throw new NotFoundException('SportField not found');
    return sportfield;
  }

  // TODO: Implement CREATE UPDATE AND DELETE
  async create(createSportFieldDto: CreateSportFieldDto) {
    const { sport: sportName, ...sportFieldAttrs } = createSportFieldDto;

    const newSportField = this.sportFieldRepository.create({
      ...sportFieldAttrs,
    });

    await this.bindSport(newSportField, sportName);

    await this.sportFieldRepository.save(newSportField);

    return { ...newSportField, sport: sportName };
  }

  async update(id: string, updateSportFieldDto: UpdateSportFieldDto) {
    const { sport: sportName, ...updatedAttrs } = updateSportFieldDto;

    const updatedSportField = await this.sportFieldRepository.preload({
      id,
      ...updatedAttrs,
    });

    if (!updatedSportField) throw new NotFoundException('SportField not found');

    if (sportName) {
      await this.bindSport(updatedSportField, sportName);
    }

    // TODO: this is not the most performant way of update
    await this.sportFieldRepository.save(updatedSportField);

    return { ...updatedSportField, sport: sportName };
  }

  async remove(id: string) {
    const sportfield = await this.sportFieldRepository.findOneBy({ id });

    if (!sportfield) throw new NotFoundException('SportField not found');

    await this.sportFieldRepository.remove(sportfield);

    return sportfield;
  }

  private async bindSport(sportField: SportField, sportName: string) {
    try {
      const { id: sportId } = await this.sportService.findOneByName(sportName, {
        id: true,
      });

      const queryBuilder = this.sportFieldRepository.createQueryBuilder();
      await queryBuilder
        .relation(SportField, 'sport')
        .of(sportField)
        .set(sportId);

      return sportField;
    } catch (e: any) {
      if (e.constructor === NotFoundException)
        throw new BadRequestException("Sport doesn't exists");
    }
  }
}
