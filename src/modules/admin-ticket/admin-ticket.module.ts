import { Module } from '@nestjs/common';
import { AdminTicketController } from './admin-ticket.controller';
import { AdminTicketService } from './admin-ticket.service';

@Module({
  controllers: [AdminTicketController],
  providers: [AdminTicketService]
})
export class AdminTicketModule {}
