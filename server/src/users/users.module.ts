import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from 'src/Core/Middleware/auth-token.middleware';
import Owner from 'src/owner/entities/owner.entity';
import { Reservation } from 'src/reservation/entities/reservation.entity';

import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [TypeOrmModule.forFeature([User, Owner, Reservation])],
  exports: [TypeOrmModule, UsersService],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({ path: 'users/auth', method: RequestMethod.GET });
  }
}
