import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Owner from 'src/owner/entities/owner.entity';
import { SportField } from 'src/sportfields/entities/sportfield.entity';
import User from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

import SportsComplex from './entities/sports-complex.entity';
import { SportsComplexController } from './sports-complex.controller';
import { SportsComplexService } from './sports-complex.service';

@Module({
  imports: [TypeOrmModule.forFeature([Owner, SportField, SportsComplex, User])],
  controllers: [SportsComplexController],
  providers: [SportsComplexService, UsersService],
})
export class SportsComplexModule {}
