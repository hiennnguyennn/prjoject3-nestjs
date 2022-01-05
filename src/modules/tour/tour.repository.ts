import { paginateRaw } from 'nestjs-typeorm-paginate';
import { EntityRepository, Repository } from 'typeorm';
import { ListTourDto } from '../admin-tour/dto/list.dto';

import { Tour } from './entities/tour.entity';

@EntityRepository(Tour)
export class TourRepository extends Repository<Tour> {
  getTourByname(name: string) {
    return this.createQueryBuilder('tour')
      .select('tour')
      .leftJoinAndSelect('tour.creator', 'creator')
      .where('tour.name= :name', { name: name })
      .getOne();
  }
  async getListTour(data: ListTourDto) {
    let tours = this.createQueryBuilder('tour')
      .select('tour.createdAt')
      .addSelect('tour.name')
      .addSelect('tour.status')
      .leftJoin('tour.creator', 'creator')
      // .leftJoin('tour.destinations', 'destinations')
      .leftJoin('tour.fromDestintion', 'from')
      .addSelect('from.name')
      .addSelect('creator.name')
      .addSelect('tour.id')
      .addSelect('tour.isHot')
      // .leftJoin('tour.departures', 'departures')
      .groupBy('tour.id');
    // .addSelect(`COUNT(distinct departures.id)`, 'departures');
    if (data.search)
      tours.where(
        'tour.name like :search or destination.name like :search or creator.name like :search',
        { search: `%${data.search}%` },
      );
    if (data.sort === 'asc') {
      tours.orderBy(`tour.createdAt`, 'ASC');
    } else tours.orderBy(`tour.createdAt`, 'DESC');
    let result = await paginateRaw<Tour>(tours, {
      limit: data.limit,
      page: data.page,
    });
    for (var i = 0; i < result.items.length; i++) {
      console.log(i, result.items[i]);
      let des = await this.createQueryBuilder('tour')
        .where('tour.id= :id', { id: result.items[i]['tour_id'] })
        .leftJoinAndSelect('tour.destinations', 'destinations')
        //.select('destinations.name')
        .getOne();
      let tmp = '';

      for (var j = 0; j < des['destinations'].length; j++) {
        if (j === des['destinations'].length - 1)
          tmp += des['destinations'][j].name;
        else tmp += des['destinations'][j].name + ', ';
      }
      console.log(i, result.items[i]);
      console.log(result.items[i], tmp);
      //console.log(i, result.items[i]['tour_id'], des['destinations']);
      result.items[i]['des'] = tmp;
    }
    return result;
  }
  getTourById(id: number) {
    return this.createQueryBuilder('tour')
      .where('tour.id= :id', { id: id })
      .select('tour')
      .addSelect('tour.image')
      .addSelect('tour.dresscode')
      .addSelect('tour.included')
      .addSelect('tour.notIncluded')
      .addSelect('tour.timeStart')
      .addSelect('tour.timeReturn')
      .leftJoin('tour.creator', 'creator')
      .addSelect('creator.id')
      .addSelect('creator.name')
      .leftJoin('tour.destinations', 'destinations')
      .addSelect('destinations.name')
      .addSelect('destinations.id')
      .leftJoinAndSelect('tour.departures', 'departures')
      .leftJoin('tour.fromDestintion', 'from')
      .addSelect('from.name')
      .addSelect('from.id')
      .leftJoinAndSelect('tour.plans', 'plans')
      .addSelect('plans.included')
      .addSelect('plans.notIncluded')
      .addSelect('tour.isHot')
      .getOne();
  }
  getAll() {
    return this.createQueryBuilder('tour')
      .select('tour.id')
      .addSelect('tour.name')
      .getMany();
  }
  get5NewTours() {
    return this.createQueryBuilder('tour')
      .select('tour')
      .addSelect('tour.image')
      .addSelect('tour.isHot')
      .where('tour.status=1')
      .andWhere('tour.isHot=0')
      .orderBy('tour.createdAt', 'DESC')
      .limit(5)
      .getMany();
  }
  get5HotTours() {
    return this.createQueryBuilder('tour')
      .select('tour')
      .addSelect('tour.isHot')
      .addSelect('tour.image')
      .where('tour.status=1')
      .andWhere('tour.isHot=1')
      .orderBy('tour.createdAt', 'DESC')
      .limit(5)
      .getMany();
  }
  async getList() {
    return this.createQueryBuilder('tour')
      .where('tour.status=1')
      .select('tour.name')
      .addSelect('tour.id')
      .addSelect('tour.description')
      .addSelect('tour.price')
      .addSelect('tour.image')
      .getMany();
  }
  async searchTour(data: string) {
    let t = await this.createQueryBuilder('tour')
      .where('LOWER(tour.name) like :data', { data: `%${data.toLowerCase()}%` })
      .andWhere('tour.status=1')
      .orderBy('tour.name', 'ASC')
      .limit(5)
      .getMany();
    return t;
  }
}
