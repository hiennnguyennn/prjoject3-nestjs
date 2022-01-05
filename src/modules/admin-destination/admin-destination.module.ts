import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminDestinationController } from './admin-destination.controller';
import { AdminDestinationService } from './admin-destination.service';
import { DestinationRepository } from '../destination/destination.repository';
import { Destination } from '../destination/entity/destination.entity';
import { AuthModule } from '../../auth/auth.module';
import { UserRepository } from '../user/user.repository';
import { TourRepository } from '../tour/tour.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DestinationRepository,
      UserRepository,
      TourRepository,
    ]),
    AuthModule,
  ],
  controllers: [AdminDestinationController],
  providers: [AdminDestinationService],
})
export class AdminDestinationModule {}
