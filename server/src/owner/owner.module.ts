import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import SportsComplex from 'src/sports-complex/entities/sports-complex.entity';
import User from 'src/users/entities/user.entity';

import Owner from './entities/owner.entity';
import { OwnerController } from './owner.controller';
import { OwnerService } from './owner.service';

@Module({
  imports: [TypeOrmModule.forFeature([SportsComplex, User, Owner])],
  controllers: [OwnerController],
  providers: [OwnerService],
})
export class OwnerModule {}
