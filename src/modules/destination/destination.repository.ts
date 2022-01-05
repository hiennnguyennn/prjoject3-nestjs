import { paginateRaw } from 'nestjs-typeorm-paginate';
import { EntityRepository, Repository } from 'typeorm';
import { ListDestinationDto } from '../admin-destination/dto/list.dto';
import { Destination } from './entity/destination.entity';
import { field } from '../admin-destination/enum';

@EntityRepository(Destination)
export class DestinationRepository extends Repository<Destination> {
  findDestinationByName(name: string) {
    return this.createQueryBuilder('destination')
      .select('destination')
      .where('destination.name= :name', { name: name })
      .getOne();
  }
  getDestinationbyId(id: number) {
    return this.createQueryBuilder('destination')
      .select('destination')
      .addSelect('destination.image')
      .addSelect('destination.area')
      .leftJoinAndSelect('destination.creator', 'creator')
      .leftJoinAndSelect('destination.tours', 'tours')
      .where('destination.id= :id', { id: id })
      .getOne();
  }
  getAll(data: ListDestinationDto) {
    let des = this.createQueryBuilder('destination')
      .select('destination.createdAt')
      .addSelect('destination.name')
      .addSelect('destination.country')
      .leftJoin('destination.creator', 'creator')
      .addSelect('creator.name')
      .addSelect('destination.id');
    if (data.search)
      des.where(
        'destination.name like :search or destination.country like :search or creator.name like :search',
        { search: `%${data.search}%` },
      );
    if (data.sort === 'asc') {
      des.orderBy(`destination.${data.sortField}`, 'ASC');
    } else des.orderBy(`destination.${data.sortField}`, 'DESC');
    return paginateRaw<Destination>(des, {
      limit: data.limit,
      page: data.page,
    });
  }
  getAllName() {
    return this.createQueryBuilder('destination')
      .select('destination.name')
      .addSelect('destination.id')
      .getMany();
  }
  getList() {
    return this.createQueryBuilder('destination')
      .select('destination.name')
      .addSelect('destination.id')
      .addSelect('destination.country')
      .addSelect('destination.image')
      .getMany();
  }
  async search(data: string) {
    let d = await this.createQueryBuilder('destination')
      .where('LOWER(destination.name) like :data', {
        data: `%${data.toLowerCase()}%`,
      })
      .orderBy('destination.name', 'ASC')
      .limit(5)
      .getMany();
    return d;
  }
}
