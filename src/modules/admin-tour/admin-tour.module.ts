import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CategoryRepository } from '../admin-category/category.repository';
import { DestinationRepository } from '../destination/destination.repository';
import { PlanRepository } from '../tour/plan.repository';
import { TicketRepository } from '../tour/ticket.repository';
import { TourRepository } from '../tour/tour.repository';
import { UserRepository } from '../user/user.repository';
import { AdminTourController } from './admin-tour.controller';
import { AdminTourService } from './admin-tour.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DestinationRepository,
      TourRepository,
      UserRepository,
      CategoryRepository,
      PlanRepository,
      TicketRepository,
    ]),
    AuthModule,
  ],
  controllers: [AdminTourController],
  providers: [AdminTourService],
})
export class AdminTourModule {}
