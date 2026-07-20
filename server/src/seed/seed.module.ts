import { Module } from '@nestjs/common';
import { SportfieldsModule } from 'src/sportfields/sportfields.module';
import { SportsModule } from 'src/sports/sports.module';

import { SeedController } from './seed.controller';
import { SeedService } from './seed.service';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [SportsModule, SportfieldsModule],
})
export class SeedModule {}
