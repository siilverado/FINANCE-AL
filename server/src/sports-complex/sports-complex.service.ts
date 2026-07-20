import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateSportsComplexDTO } from './dto/create-sports-complex.dto';
import { UpdateSportsComplexDTO } from './dto/update-sports-complex.dto';
import SportsComplex from './entities/sports-complex.entity';

@Injectable()
export class SportsComplexService {
  constructor(
    @InjectRepository(SportsComplex)
    private readonly SportsComplexRepository: Repository<SportsComplex>,
  ) {}

  create(createSportsComplexDTO: CreateSportsComplexDTO, owner: any) {
    const newSportComplex: SportsComplex =
      this.SportsComplexRepository.create(createSportsComplexDTO);
    newSportComplex.owner = owner;
    return this.SportsComplexRepository.save(newSportComplex);
  }

  async findAll(): Promise<SportsComplex[]> {
    return await this.SportsComplexRepository.find();
  }

  async findAllOfOwner(owner: any): Promise<SportsComplex[]> {
    return await this.SportsComplexRepository.find({
      where: { owner: owner.id },
    });
  }

  findOne(id: string) {
    return this.SportsComplexRepository.findOne({
      where: { id },
    });
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
