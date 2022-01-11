import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import { CategoryRepository } from './category.repository';
import { CreateCategoryDto } from './dto/create.dto';
import { listCategoryDto } from './dto/list.dto';

@Injectable()
export class AdminCategoryService {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly userRepository: UserRepository,
  ) {}
  async getList(data: listCategoryDto) {
    return this.categoryRepository.getList(data);
  }
  async createCategory(user, data: CreateCategoryDto) {
    let c = await this.categoryRepository
      .createQueryBuilder('category')
      .where('category.name= :name', { name: data.name })
      .select('category')
      .getOne();

    if (c) throw new BadRequestException('NAME EXIST');
    const u = await this.userRepository.findUserByEmailAndRole(user.mail, [2]);

    let category = {};
    category['creator'] = u;
    category['name'] = data.name;
    await this.categoryRepository.save(category);
    return 'SAVED';
  }
  async getCategory(id: number) {
    return this.categoryRepository.getOne(id);
  }
  async editCategory(id, data: CreateCategoryDto) {
    const c = await this.categoryRepository.getOne(id);
    if (data.name !== c.name) {
      let tmp = await this.categoryRepository.getOneByName(data.name);
      if (tmp) throw new BadRequestException('NAME EXIST');
      c.name = data.name;
      await c.save();
    }
  }
  async deleteCategory(id) {
    const c = await this.categoryRepository.findOne(id);
    return this.categoryRepository.remove(c);
  }
  async getAll() {
    return this.categoryRepository.getAll();
  }
}
