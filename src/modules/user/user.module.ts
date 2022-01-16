import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Departure } from '../admin-departure/entities/departure.entity';
import { Ticket } from '../tour/entities/ticket.entity';
import { Tour } from '../tour/entities/tour.entity';
import { TicketRepository } from '../tour/ticket.repository';
import { User } from './entity/user.entity';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserRepository,
      Tour,
      Departure,
      Ticket,
      TicketRepository,
    ]),
    AuthModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
