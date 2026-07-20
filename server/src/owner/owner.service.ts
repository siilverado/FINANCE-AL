import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthUserDTO } from 'src/Core/auth/dto';
import User from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import Owner from './entities/owner.entity';

@Injectable()
export class OwnerService {
  private readonly logger = new Logger('OwnerService');
  constructor(
    @InjectRepository(Owner)
    private readonly ownerRepository: Repository<Owner>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createOwnerDto: CreateOwnerDto, user: AuthUserDTO) {
    try {
      const { ...ownerData } = createOwnerDto;
      const userDB = await this.userRepository.findOneBy({ id: user.id });
      if (!userDB) throw new NotFoundException('The user not exist');
      const owner = this.ownerRepository.create({
        user,
        ...ownerData,
      });
      await this.ownerRepository.save(owner);

      userDB.owner = owner;

      await this.userRepository.save(userDB);

      return { ...owner, firstName: userDB.firstName };
    } catch (error) {
      this.handleDBException(error);
    }
  }

  async findAll() {
    try {
      const owners = await this.ownerRepository.find({
        relations: {
          user: true,
        },
      });
      return owners;
    } catch (error) {
      this.handleDBException(error);
    }
  }

  async findOne(id: string) {
    try {
      const owner = await this.ownerRepository.findOneBy({ id });
      return owner;
    } catch (error) {
      this.handleDBException(error);
    }
  }

  async update(userId: string, updateOwnerDto: UpdateOwnerDto) {
    try {
      const owner = await this.ownerRepository.update(userId, updateOwnerDto);
      return owner;
    } catch (error) {
      this.handleDBException(error);
    }
  }

  private handleDBException(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);
    // console.log(error)
    this.logger.error(error);
    throw new InternalServerErrorException('Unexpected error, check server logs');
  }
}
