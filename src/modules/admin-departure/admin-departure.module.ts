import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { DestinationRepository } from '../destination/destination.repository';
import { TourRepository } from '../tour/tour.repository';
import { UserRepository } from '../user/user.repository';
import { AdminDepartureController } from './admin-departure.controller';
import { AdminDepartureService } from './admin-departure.service';
import { DepartureRepository } from './departure.repository';
import { Departure } from './entities/departure.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserRepository,
      TourRepository,
      DepartureRepository,
      DestinationRepository,
    ]),
    AuthModule,
  ],
  controllers: [AdminDepartureController],
  providers: [AdminDepartureService],
})
export class AdminDepartureModule {}
