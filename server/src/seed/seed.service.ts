import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Sport } from 'src/sports/entities/sport.entity';
import { SportField } from 'src/sportfields/entities/sportfield.entity';
import { User } from 'src/users/entities/user.entity';
import { Owner } from 'src/owner/entities/owner.entity';
import { SportsComplex } from 'src/sports-complex/entities/sports-complex.entity';

import { initialData } from './data/seed-data';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Sport)
    private readonly sportRepository: Repository<Sport>,
    @InjectRepository(SportField)
    private readonly SportFieldRepository: Repository<SportField>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Owner)
    private readonly ownerRespository: Repository<Owner>,
    @InjectRepository(SportsComplex)
    private readonly sportcomplexRespository: Repository<SportsComplex>,
  ) {}

  async runSeed() {
    await this.deleteAll();

    // Add users and owners
    const usersDB: User[] = [];
    const ownersDB: User[] = [];
    for (const user of initialData.users) {
      const { owner, ...userFields } = user;
      const instance = this.userRepository.create(userFields);

      if (!owner) {
        const userDB = await this.userRepository.save(instance);
        usersDB.push(userDB);
      } else {
        const ownerInstance = this.ownerRespository.create(owner);
        instance.owner = ownerInstance;
        const userDB = await this.userRepository.save(instance);
        ownersDB.push(userDB);
      }
    }

    // Add sportsComplex
    const sportsComplexsDB = await Promise.all(
      initialData.sportscomplex.map(async (sp, index) => {
        const idx = index <= ownersDB.length - 1 ? index : 0;
        const spInstance = this.sportcomplexRespository.create({
          ...sp,
        });

        spInstance.owner = ownersDB[idx].owner;
        return await this.sportcomplexRespository.save(spInstance);
      }),
    );

    const sportsDB = await Promise.all(
      initialData.sports.map(async (sport) => {
        const sportInstance = this.sportRepository.create(sport);
        return await this.sportRepository.save(sportInstance);
      }),
    );

    for (const [index, sportField] of initialData.sportfields.entries()) {
      const idx = index <= sportsComplexsDB.length - 1 ? index : 0;
      const { sport: sportName, reservation, ...sportFieldAttrs } = sportField;
      const sport = sportsDB.find((sport) => sport.name === sportName);
      const reservations = reservation
        ? reservation.map((res) => ({ ...res, user: usersDB[0] }))
        : [];
      const sportFieldInstance = this.SportFieldRepository.create({
        ...sportFieldAttrs,
        reservation: reservations,
      });
      sportFieldInstance.sport = sport;
      sportFieldInstance.sportsComplex = sportsComplexsDB[idx];

      const sportFieldDB = await this.SportFieldRepository.save(sportFieldInstance);
    }
  }

  async deleteAll() {
    await this.SportFieldRepository.createQueryBuilder('sportfield').delete().where({}).execute();
    await this.sportRepository.createQueryBuilder('sport').delete().where({}).execute();
    await this.sportcomplexRespository
      .createQueryBuilder('sportsComplex')
      .delete()
      .where({})
      .execute();
    await this.userRepository.createQueryBuilder('user').delete().where({}).execute();
    await this.ownerRespository.createQueryBuilder('owner').delete().where({}).execute();
  }
}
