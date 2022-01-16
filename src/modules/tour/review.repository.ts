import { paginateRaw } from 'nestjs-typeorm-paginate';
import { EntityRepository, Repository } from 'typeorm';
import { ListReviewDto } from '../admin-review/dto/list.dto';
import { Review } from './entities/review.entity';

@EntityRepository(Review)
export class ReviewRepository extends Repository<Review> {
  async createReview(data) {
    await this.save(data);
  }
  async getList(data: ListReviewDto) {
    let list = await this.createQueryBuilder('review')
      .select('review')
      .addSelect('review.message')
      .leftJoin('review.ticket', 'ticket')
      .addSelect('ticket.id')
      .leftJoin('ticket.owner', 'owner')
      .addSelect('owner.name')
      .leftJoin('ticket.departure', 'departure')
      .addSelect('departure.id')
      .leftJoin('departure.tour', 'tour')
      .addSelect('tour.name')

      .groupBy('review.id');
    if (data.search)
      list.where('owner.name like :search or tour.name like :search', {
        search: `%${data.search}%`,
      });
    if (data.sort === 'asc') {
      list.orderBy(`review.createdAt`, 'ASC');
    } else list.orderBy(`review.createdAt`, 'DESC');
    let result = await paginateRaw<Review>(list, {
      limit: data.limit,
      page: data.page,
    });

    return result;
  }
  async getReviewTour(id: number) {
    return this.createQueryBuilder('review')
      .select('review')
      .addSelect('review.message')
      .leftJoin('review.ticket', 'ticket')
      .addSelect('ticket.id')
      .leftJoin('ticket.owner', 'owner')
      .addSelect('owner.name')
      .leftJoin('ticket.departure', 'departure')
      .addSelect('departure.start')
      .addSelect('departure.end')
      .leftJoin('departure.tour', 'tour')
      .where('tour.id= :id', { id: id })
      .orderBy('review.updatedAt', 'DESC')
      .getMany();
  }
}
