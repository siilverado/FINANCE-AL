import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Sport } from './entities/sport.entity';
import { SportsController } from './sports.controller';
import { SportsService } from './sports.service';

@Module({
  controllers: [SportsController],
  providers: [SportsService],
  imports: [TypeOrmModule.forFeature([Sport])],
  exports: [TypeOrmModule, SportsService],
})
export class SportsModule {}
