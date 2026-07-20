import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from 'src/Core/Middleware/auth-token.middleware';
import { Reservation } from 'src/reservation/entities/reservation.entity';
import { ReservationModule } from 'src/reservation/reservation.module';
import { Sport } from 'src/sports/entities/sport.entity';
import { SportsModule } from 'src/sports/sports.module';
import { SportsComplexModule } from 'src/sports-complex/sports-complex.module';

import { SportField } from './entities/sportfield.entity';
import { SportfieldsController } from './sportfields.controller';
import { SportfieldsService } from './sportfields.service';

@Module({
  controllers: [SportfieldsController],
  providers: [SportfieldsService],
  imports: [
    TypeOrmModule.forFeature([SportField, Reservation, Sport]),
    SportsModule,
    SportsComplexModule,
    ReservationModule,
  ],
  exports: [TypeOrmModule, SportfieldsService],
})
export class SportfieldsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('sportfields');
  }
}
