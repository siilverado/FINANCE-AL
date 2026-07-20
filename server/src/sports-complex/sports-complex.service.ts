import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateSportsComplexDTO } from './dto/create-sports-complex.dto';
import { UpdateSportsComplexDTO } from './dto/update-sports-complex.dto';
import { AvailabilityRange } from './entities/availability-range.entity';
import SportsComplex from './entities/sports-complex.entity';

@Injectable()
export class SportsComplexService {
  private readonly logger: Logger = new Logger(SportsComplexService.name);

  constructor(
    @InjectRepository(SportsComplex)
    private readonly SportsComplexRepository: Repository<SportsComplex>,
    @InjectRepository(AvailabilityRange)
    private readonly availabilityRangeRepository: Repository<AvailabilityRange>,
  ) {}

  async create(createSportsComplexDTO: CreateSportsComplexDTO, owner: any) {
    const { availability, ...sportsComplexFields } = createSportsComplexDTO;
    const newSportComplex: SportsComplex = this.SportsComplexRepository.create(sportsComplexFields);

    const availabilityRanges = availability.map(async (availabilityRange) => {
      const { start_hour = 1, end_hour = 3 } = availabilityRange;
      const range = this.availabilityRangeRepository.create({
        start_hour,
        end_hour,
      });

      return await this.availabilityRangeRepository.save(range);
    });

    newSportComplex.owner = owner;
    newSportComplex.availability = await Promise.all(availabilityRanges);
    return await this.SportsComplexRepository.save(newSportComplex);
  }

  async findAll(): Promise<SportsComplex[]> {
    return await this.SportsComplexRepository.find();
  }

  async findAllOfOwner(owner: any): Promise<SportsComplex> {
    return await this.SportsComplexRepository.findOne({
      where: { owner },
    });
  }

  async findOne(id: string) {
    return await this.SportsComplexRepository.findOne({
      where: { id },
    });
  }

  async findOneWithOwner(id: string) {
    return await this.SportsComplexRepository.findOne({
      where: { id },
      relations: {
        owner: true,
      },
    });
  }

  async findOneByOwnerId(ownerId: string) {
    return await this.SportsComplexRepository.createQueryBuilder('sc')
      .innerJoinAndSelect('sc.owner', 'owner', 'owner.id = :ownerId', { ownerId })
      .getOne();
  }

  async update(ownerId: string, id: string, updateSportsComplexDTO: UpdateSportsComplexDTO) {
    const sportsComplex = await this.SportsComplexRepository.createQueryBuilder('sportsComplex')
      .leftJoinAndSelect('sportsComplex.owner', 'owner')
      .where('sportsComplex.id = :id AND owner.id = :ownerId', { id, ownerId })
      .getOne();

    if (!sportsComplex) {
      throw new NotFoundException(`Sports complex with id ${id} not found`);
    }

    const updatedSportsComplex = this.SportsComplexRepository.merge(
      sportsComplex,
      updateSportsComplexDTO,
    );

    return this.SportsComplexRepository.save(updatedSportsComplex);
  }

  async remove(id: string, ownerId: string) {
    const sportsComplex = await this.SportsComplexRepository.createQueryBuilder('sportsComplex')
      .leftJoinAndSelect('sportsComplex.owner', 'owner')
      .where('sportsComplex.id = :id AND owner.id = :ownerId', { id, ownerId })
      .getOne();
    if (!sportsComplex) {
      throw new NotFoundException(`Sports complex with id ${id} not found`);
    }
    await this.SportsComplexRepository.remove(sportsComplex);
    return `Sports complex with id ${id} has been successfully removed`;
  }
}
