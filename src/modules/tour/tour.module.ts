import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Departure } from '../admin-departure/entities/departure.entity';
import { DestinationModule } from '../destination/destination.module';
import { DestinationRepository } from '../destination/destination.repository';
import { DestinationService } from '../destination/destination.service';
import { UserModule } from '../user/user.module';
import { UserRepository } from '../user/user.repository';
import { UserService } from '../user/user.service';
import { Plan } from './entities/plan.enity';
import { Tour } from './entities/tour.entity';
import { TourController } from './tour.controller';
import { TourRepository } from './tour.repository';
import { TourService } from './tour.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Departure,
      TourRepository,
      Plan,
      DestinationRepository,
      UserRepository,
    ]),
    AuthModule,
  ],
  controllers: [TourController],
  providers: [TourService],
})
export class TourModule {}
