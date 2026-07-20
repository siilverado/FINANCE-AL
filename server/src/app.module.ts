import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './Core/auth/auth.module';
import Owner from './owner/entities/owner.entity';
import { OwnerModule } from './owner/owner.module';
import { Reservation } from './reservation/entities/reservation.entity';
import { ReservationModule } from './reservation/reservation.module';
import { SeedModule } from './seed/seed.module';
import { SportField } from './sportfields/entities/sportfield.entity';
import { SportfieldsModule } from './sportfields/sportfields.module';
import { Sport } from './sports/entities/sport.entity';
import { SportsModule } from './sports/sports.module';
import SportsComplex from './sports-complex/entities/sports-complex.entity';
import { SportsComplexModule } from './sports-complex/sports-complex.module';
import { AvailabilityRange } from './sports-complex/entities/availability-range.entity';
import User from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import { ImageModule } from './image/image.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [User, Sport, SportField, Owner, SportsComplex, Reservation, AvailabilityRange],
        // autoLoadEntities: true,
        synchronize: true,
        // dropSchema: true,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User, Sport, SportField, Owner, SportsComplex, Reservation]),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    UsersModule,
    AuthModule,
    SportsModule,
    SportfieldsModule,
    SeedModule,
    SportsComplexModule,
    OwnerModule,
    ReservationModule,
    ImageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
