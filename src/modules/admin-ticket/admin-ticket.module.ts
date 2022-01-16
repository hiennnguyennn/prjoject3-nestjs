import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { TicketRepository } from '../tour/ticket.repository';
import { AdminTicketController } from './admin-ticket.controller';
import { AdminTicketService } from './admin-ticket.service';

@Module({
  imports: [TypeOrmModule.forFeature([TicketRepository]), AuthModule],
  controllers: [AdminTicketController],
  providers: [AdminTicketService],
})
export class AdminTicketModule {}
