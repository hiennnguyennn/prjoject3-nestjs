import { paginateRaw } from 'nestjs-typeorm-paginate';
import { EntityRepository, Repository } from 'typeorm';

import { listCategoryDto } from './dto/list.dto';
import { Category } from './entities/category.entity';

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {
  async getList(data: listCategoryDto) {
    let list = await this.createQueryBuilder('category')
      .select('category')
      .leftJoin('category.creator', 'creator')
      .addSelect('creator.name');

    if (data.search) {
      list.where('category.name like :search', { search: `%${data.search}%` });
    }
    if (data.sort === 'asc') {
      list.orderBy(`category.name`, 'ASC');
    } else list.orderBy(`category.name`, 'DESC');
    return paginateRaw<Category>(list, {
      limit: data.limit,
      page: data.page,
    });
  }
  async getOne(id: number) {
    return this.createQueryBuilder('category')
      .where('category.id= :id', { id: id })
      .select('category')
      .getOne();
  }
  async getOneByName(name: string) {
    return this.createQueryBuilder('category')
      .where('category.name= :name', { name: name })
      .select('category')
      .getOne();
  }
  async getAll() {
    return this.createQueryBuilder('category')
      .select('category.id')
      .addSelect('category.name')
      .getMany();
  }
}
