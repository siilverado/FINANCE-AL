import { Module } from '@nestjs/common';
import { SportfieldsModule } from 'src/sportfields/sportfields.module';
import { SportsModule } from 'src/sports/sports.module';

import { SeedController } from './seed.controller';
import { SeedService } from './seed.service';
import { UsersModule } from 'src/users/users.module';
import { OwnerModule } from 'src/owner/owner.module';
import { SportsComplexModule } from 'src/sports-complex/sports-complex.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [SportsModule, SportfieldsModule, UsersModule, OwnerModule, SportsComplexModule],
})
export class SeedModule {}
