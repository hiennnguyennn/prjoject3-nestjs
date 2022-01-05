import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TourModule } from '../tour/tour.module';
import { DestinationController } from './destination.controller';
import { DestinationRepository } from './destination.repository';
import { DestinationService } from './destination.service';

@Module({
  imports: [TypeOrmModule.forFeature([DestinationRepository])],
  controllers: [DestinationController],
  providers: [DestinationService],
})
export class DestinationModule {}
