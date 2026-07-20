import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from 'src/Core/Middleware/auth-token.middleware';
import { Reservation } from 'src/reservation/entities/reservation.entity';
import { Sport } from 'src/sports/entities/sport.entity';
import { SportsModule } from 'src/sports/sports.module';
import SportsComplex from 'src/sports-complex/entities/sports-complex.entity';

import { SportField } from './entities/sportfield.entity';
import { SportfieldsController } from './sportfields.controller';
import { SportfieldsService } from './sportfields.service';

@Module({
  controllers: [SportfieldsController],
  providers: [SportfieldsService],
  imports: [
    TypeOrmModule.forFeature([SportField, SportsComplex, Reservation, Sport]),
    SportsModule,
  ],
  exports: [TypeOrmModule],
})
export class SportfieldsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('sportfields');
  }
}
