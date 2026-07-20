import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SportsService } from 'src/sports/sports.service';
import { SportsComplexService } from 'src/sports-complex/sports-complex.service';
import { Repository } from 'typeorm';

import { CreateSportFieldDto, GetDayAvailabilityDto, UpdateSportFieldDto } from './dto';
import { SportField } from './entities/sportfield.entity';
import { AuthUserDTO, UserDTO } from 'src/Core/auth/dto';
import SportsComplex from 'src/sports-complex/entities/sports-complex.entity';
import { plainToClass } from 'class-transformer';
import { ReservationService } from 'src/reservation/reservation.service';

@Injectable()
export class SportfieldsService {
  constructor(
    private readonly sportService: SportsService,
    private readonly sportsComplexService: SportsComplexService,
    private readonly reservationsService: ReservationService,
    @InjectRepository(SportField)
    private readonly sportFieldRepository: Repository<SportField>,
    @InjectRepository(SportsComplex)
    private readonly sportsComplexRepository: Repository<SportsComplex>,
  ) {}

  async findAll(user: AuthUserDTO) {
    const allSportfields = await this.sportFieldRepository
      .createQueryBuilder('sportFields')
      .innerJoinAndSelect('sportFields.sportsComplex', 'sc', 'sc.ownerId = :ownerId', {
        ownerId: user.ownerId,
      })
      .leftJoinAndSelect('sportFields.sport', 'sport')
      .leftJoinAndSelect('sportFields.reservation', 'res')
      .getMany();

    if (!allSportfields) throw new NotFoundException('SportField not found');

    // TODO: Refactor this to use an interceptor
    return allSportfields.map(({ sportsComplex, sport, ...field }) => ({
      ...field,
      sportsComplex,
      availability: sportsComplex?.availability,
      sport: sport.name,
    }));
  }

  async findWithSport(sport: string) {
    const allSportfields = await this.sportFieldRepository.find({
      where: {
        sport: {
          name: sport,
        },
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

  async findOwnerReservations(user: AuthUserDTO) {
    const reservations = await this.sportFieldRepository
      .createQueryBuilder('sf')
      .innerJoinAndSelect('sf.reservation', 'res')
      .leftJoin('res.user', 'user')
      .addSelect(['user.firstName', 'user.lastName', 'user.email'])
      .innerJoinAndSelect('sf.sportsComplex', 'sc', 'sc.ownerId = :ownerId', {
        ownerId: user.ownerId,
      })
      .getMany();

    return reservations;
  }

  async getAvailability(id: string) {
    const sportField = await this.sportFieldRepository.findOneBy({ id });

    return sportField.availability;
  }

  async getDayAvailability(id: string, getDayAvailabilityDto: GetDayAvailabilityDto) {
    const { date } = getDayAvailabilityDto;
    const sportField = await this.sportFieldRepository
      .createQueryBuilder('sf')
      .innerJoinAndSelect('sf.sportsComplex', 'sp', 'sf.id = :id', { id })
      .leftJoinAndSelect('sp.availability', 'av')
      .leftJoinAndSelect('sf.reservation', 'res', 'res.date = :date', { date })
      .getOne();

    const reservations = sportField.reservation.map((res) => res.hour);
    return {
      turns: sportField.availability.reduce((acc, range) => {
        let { start_hour, end_hour } = range;
        start_hour = typeof start_hour === 'string' ? parseInt(start_hour) : start_hour;
        end_hour = typeof end_hour === 'string' ? parseInt(end_hour) : end_hour;

        const turns = [];
        for (let i = start_hour; i < end_hour; i++) {
          if (reservations.includes(i)) continue;
          turns.push({ start_hour: i, end_hour: i + 1 });
        }
        return [...acc, ...turns];
      }, []),
    };
  }

  async getReservations(id: string) {
    const sportField = await this.sportFieldRepository
      .createQueryBuilder('sportField')
      .leftJoinAndSelect('sportField.reservation', 'res')
      .where('sportField.id = :id', { id })
      .getMany();

    return sportField;
  }

  async findOne(id: string) {
    const sportfield = await this.sportFieldRepository.findOne({
      where: { id },
      relations: { sport: true },
    });
    console.log(sportfield)
    if (!sportfield) throw new NotFoundException('SportField not found');
    return sportfield;
  }

  async create(createSportFieldDto: CreateSportFieldDto, ownerId: string) {
    const { sport: sportName, fieldType, ...sportFieldAttrs } = createSportFieldDto;

    const newSportField = this.sportFieldRepository.create({
      ...sportFieldAttrs,
    });

    newSportField.sport = await this.getSport(sportName, fieldType);
    newSportField.fieldType = fieldType;

    const sportsComplex = await this.sportsComplexService.findOneByOwnerId(ownerId);
    console.log(sportsComplex, ownerId);

    if (!sportsComplex || sportsComplex.owner?.id !== ownerId)
      throw new ForbiddenException('Insuficient Permissions');

    newSportField.sportsComplex = sportsComplex;

    await this.sportFieldRepository.save(newSportField);

    return { ...newSportField, fieldType, sport: sportName };
  }

  async update(id: string, updateSportFieldDto: UpdateSportFieldDto, ownerId: string) {
    await this.checkOwner(ownerId, id);

    const { sport: sportName, fieldType, ...updatedAttrs } = updateSportFieldDto;

    const updatedSportField = await this.sportFieldRepository.preload({
      id,
      ...updatedAttrs,
    });

    if (!updatedSportField) throw new NotFoundException('SportField not found');

    if (sportName) {
      const newFieldType = fieldType || updatedSportField.fieldType;
      updatedSportField.sport = await this.getSport(sportName, newFieldType);
      updatedSportField.fieldType = newFieldType;
    }

    // TODO: this is not the most performant way to update
    await this.sportFieldRepository.save(updatedSportField);

    return { ...updatedSportField, sport: sportName };
  }

  async remove(id: string, ownerId: string) {
    await this.checkOwner(ownerId, id);
    const sportfield = await this.sportFieldRepository.findOneBy({ id });

    if (!sportfield) throw new NotFoundException('SportField not found');

    await this.sportFieldRepository.remove(sportfield);

    return sportfield;
  }

  async search(
    lat: number,
    lng: number,
    rHour: number,
    date: string,
    sport: string,
    fieldType: string,
  ): Promise<any> {
    const R = 6371; // Radio de la Tierra en kilómetros
    const limit = 20; // Límite de resultados
    // console.log(date);
    // const splittedDate = date.split('/');
    // const fDate = `${splittedDate[1]}/${splittedDate[0]}/${splittedDate[2]}`;
    // console.log(fDate);
    //

    const nearbySportFields = await this.sportFieldRepository
      .createQueryBuilder('sportField')
      .select([
        'sportField.id',
        'sportField.name',
        'sportField.description',
        'sportField.dimensions',
        'sportField.images',
        'sportField.sportId',
        'sport.name',
        'sportsComplex.id',
        'sportsComplex.name',
        'sportsComplex.email',
        'sportsComplex.address',
        'sportsComplex.phone',
        'sportsComplex.description',
        'sportsComplex.lat',
        'sportsComplex.lng',
        'sportsComplex.images',
        `(${R} * acos(cos(radians(:lat)) * cos(radians(:lat)) * cos(radians(:lng) - radians(:lng)) + sin(radians(:lat)) * sin(radians(:lat)))) as distancia`,
      ])
      .innerJoin(
        'sportField.sport',
        'sport',
        `sport.name = :sport ${
          fieldType === 'Cualquier tipo' ? '' : ' AND sportField.fieldType = :fieldType'
        }`,
        { sport, fieldType },
      )
      .leftJoinAndSelect('sportField.sportsComplex', 'sportsComplex')
      .innerJoin(
        'sportsComplex.availability',
        'ar',
        'ar.start_hour <= :rHour AND ar.end_hour >= :rHour',
        { rHour },
      )
      .leftJoinAndSelect('sportField.reservation', 'r', 'r.hour = :rHour AND r.date = :date', {
        rHour,
        date,
      })
      .orderBy('distancia', 'ASC')
      .setParameter('lat', lat)
      .setParameter('lng', lng)
      .limit(limit)
      .getMany();

    const availableSportFields = nearbySportFields.filter((sp) => sp.reservation.length === 0);

    const sportFields = plainToClass(SportField, availableSportFields);
    return sportFields.map((sportField) => {
      const { reservation: _, ...sf } = sportField;
      return sf;
    });
  }

  private async checkOwner(ownerId: string, sportFieldId: string) {
    const realOwner = await this.sportFieldRepository
      .createQueryBuilder('sportfields')
      .select('owner.*')
      .where('sportfields.id = :sportFieldId', { sportFieldId })
      .innerJoin('sportfields.sportsComplex', 'sportsComplex')
      .innerJoin('sportsComplex.owner', 'owner')
      .getRawOne();

    if (!realOwner) throw new NotFoundException("Sport field doesn't exists");

    if (realOwner.id !== ownerId) throw new ForbiddenException('Insuficient premissions');

    return realOwner.id;
  }

  private async getSport(sportName: string, fieldType: string) {
    try {
      const sport = await this.sportService.findOneByName(sportName);
      if (!sport.types.includes(fieldType))
        throw new BadRequestException("FieldType doesn't exists");

      return sport;
    } catch (e: any) {
      if (e.constructor === NotFoundException)
        throw new BadRequestException("Sport doesn't exists");

      throw e;
    }
  }
}
