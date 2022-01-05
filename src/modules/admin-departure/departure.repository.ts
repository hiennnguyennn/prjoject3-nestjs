import { paginateRaw } from 'nestjs-typeorm-paginate';
import { EntityRepository, Repository } from 'typeorm';
import { ListDepartureDto } from './dto/list.dto';
import { Departure } from './entities/departure.entity';

@EntityRepository(Departure)
export class DepartureRepository extends Repository<Departure> {
  getList(data: ListDepartureDto) {
    let list = this.createQueryBuilder('departure')
      .select('departure.createdAt')
      .addSelect('departure.id')
      .leftJoin('departure.tour', 'tour')
      .addSelect('tour.name')
      .addSelect('departure.max')
      .addSelect('departure.status')
      .addSelect('departure.start')
      .leftJoin('departure.creator', 'creator')
      .addSelect('creator.name');

    if (data.sort === 'asc') {
      list.orderBy(`departure.createdAt`, 'ASC');
    } else list.orderBy(`departure.createdAt`, 'DESC');
    return paginateRaw<Departure>(list, {
      limit: data.limit,
      page: data.page,
    });
  }
  getOne(id: number) {
    return this.createQueryBuilder('departure')
      .where('departure.id= :id', { id: id })
      .select('departure')
      .getOne();
  }
}
