import { paginateRaw } from 'nestjs-typeorm-paginate';
import { EntityRepository, Repository } from 'typeorm';
import { ListTicketDto } from '../admin-ticket/dto/list.dto';
import { Ticket } from './entities/ticket.entity';

@EntityRepository(Ticket)
export class TicketRepository extends Repository<Ticket> {
  async findUserDepartureBooking(userId: number, departureId: number) {
    let t = await this.createQueryBuilder('ticket')
      .leftJoin('ticket.owner', 'owner')
      .where('owner.id = :userId', { userId: userId })
      .leftJoin('ticket.departure', 'departure')
      .andWhere('departure.id = :departureId', { departureId: departureId })
      .andWhere('ticket.status IN (:status)', { status: [0, 1, 2, 3] })
      .getOne();
    return t;
  }
  async countTicketTour(tourId: number) {
    return this.createQueryBuilder('ticket')
      .leftJoin('ticket.departure', 'departure')
      .leftJoin('departure.tour', 'tour')
      .where('tour.id=:id', { id: tourId })
      .andWhere('ticket.status in (:status)', { status: [1, 2, 3] })
      .select('count(ticket.id)', 'count')
      .getRawOne();
  }
  async countTicketDeparture(id: number) {
    return this.createQueryBuilder('ticket')
      .leftJoin('ticket.departure', 'departure')

      .where('departure.id=:id', { id: id })
      .andWhere('ticket.status in (:status)', { status: [1, 2, 3, 4] })
      .select('count(ticket.id)', 'count')
      .getRawOne();
  }
  async getList(data: ListTicketDto) {
    let tickets = this.createQueryBuilder('ticket')
      .select('ticket')
      .leftJoin('ticket.departure', 'departure')
      .leftJoin('departure.tour', 'tour')
      .addSelect('tour.name')
      .leftJoin('ticket.owner', 'owner')
      .addSelect('owner.name')
      .addSelect('departure.start')

      .groupBy('ticket.id');
    // .addSelect(`COUNT(distinct departures.id)`, 'departures');
    if (data.search)
      tickets.where('owner.name like :search or tour.name like :search', {
        search: `%${data.search}%`,
      });
    if (data.sort === 'asc') {
      tickets.orderBy(`ticket.createdAt`, 'ASC');
    } else tickets.orderBy(`ticket.createdAt`, 'DESC');
    let result = await paginateRaw<Ticket>(tickets, {
      limit: data.limit,
      page: data.page,
    });

    return result;
  }
  async getUserTicket(id: number) {
    return this.createQueryBuilder('ticket')
      .select('ticket')
      .leftJoin('ticket.owner', 'owner')
      .addSelect('owner.id')
      .where('owner.id = :id', { id: id })
      .leftJoin('ticket.departure', 'departure')
      .addSelect('departure.start')
      .addSelect('departure.end')
      .leftJoin('departure.tour', 'tour')
      .addSelect('tour.price')
      .addSelect('tour.name')
      .orderBy('ticket.updatedAt', 'DESC')
      .leftJoinAndSelect('ticket.review', 'review')
      .addSelect('review.message')
      .getMany();
  }
  async getTicketDeparture(id: number) {
    return this.createQueryBuilder('ticket')
      .select('ticket')
      .where('ticket.status in (:status)', { status: [1, 2] })
      .leftJoin('ticket.departure', 'departure')
      .andWhere('departure.id= :id', { id: id })
      .getMany();
  }
}
