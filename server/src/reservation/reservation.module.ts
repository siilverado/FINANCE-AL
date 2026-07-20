import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SportField } from 'src/sportfields/entities/sportfield.entity';
import User from 'src/users/entities/user.entity';

import { Reservation } from './entities/reservation.entity';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';
import { AuthMiddleware } from 'src/Core/Middleware/auth-token.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation, SportField, User])],
  controllers: [ReservationController],
  providers: [ReservationService],
  exports: [ReservationService],
})
export class ReservationModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('reservation');
  }
}
