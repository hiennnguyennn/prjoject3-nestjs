import { Injectable } from '@nestjs/common';
import { TicketRepository } from '../tour/ticket.repository';
import { ChangeTicketDto } from './dto/change.dto';
import { ListTicketDto } from './dto/list.dto';

@Injectable()
export class AdminTicketService {
  constructor(private readonly ticketRepository: TicketRepository) {}
  getList(data: ListTicketDto) {
    return this.ticketRepository.getList(data);
  }
  async changeStatus(data: ChangeTicketDto) {
    let t = await this.ticketRepository
      .createQueryBuilder('ticket')
      .where('ticket.id= :id', { id: data.ticketId })
      .getOne();
    t.status = data.status;
    await t.save();
    console.log(111, t);
    return 'changed';
  }
}
