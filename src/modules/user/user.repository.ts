import { BadRequestException } from '@nestjs/common';
import { LoginDto } from 'src/auth/dto/login.dto';
import { EntityRepository, Repository } from 'typeorm';
import { EditUserTypeDto } from '../admin-users/dto/editUserType.dto';
import { ListUserDto } from '../admin-users/dto/listUser.dto';
import { User } from './entity/user.entity';
import {
  IPaginationOptions,
  paginate,
  paginateRaw,
  paginateRawAndEntities,
} from 'nestjs-typeorm-paginate';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findUserByEmailAndRole(email: string, role: number[]) {
    const u = await this.createQueryBuilder('user')
      .where('user.mail= :email', { email: email })
      .andWhere('user.role IN (:role)', { role: role })
      .select('user.name')
      .addSelect('user.mail')
      .addSelect('user.gender')
      .addSelect('user.phone')
      .addSelect('user.dob')
      .addSelect('user.id')
      .addSelect('user.id_card')
      .addSelect('user.address')
      .addSelect('user.role')
      .addSelect('user.status')
      .addSelect('user.password')
      .addSelect('user.employeeId')
      .getOne();
    return u;
  }
  async findUserByEmail(email: string) {
    const u = await this.createQueryBuilder('user')
      .where('user.mail= :email', { email: email })
      .select('user.name')
      .addSelect('user.mail')
      .addSelect('user.gender')
      .addSelect('user.id')
      .addSelect('user.phone')
      .addSelect('user.dob')
      .addSelect('user.id_card')
      .addSelect('user.address')
      .addSelect('user.employeeId')
      .addSelect('user.role')
      .addSelect('user.status')
      .getOne();
    return u;
  }
  async findStaffByEmployeeId(employeeId: string) {
    const u = await this.createQueryBuilder('user')
      .where('user.employeeId= :employeeId', { employeeId: employeeId })
      .select('user.name')
      .addSelect('user.mail')
      .addSelect('user.id')
      .addSelect('user.gender')
      .addSelect('user.phone')
      .addSelect('user.dob')
      .addSelect('user.employeeId')
      .addSelect('user.id_card')
      .addSelect('user.address')
      .addSelect('user.role')
      .addSelect('user.status')
      .getOne();
    return u;
  }
  async findUserById(id: number) {
    const u = await this.createQueryBuilder('user')
      .where('user.id= :id', { id: id })
      .select('user.name')
      .addSelect('user.mail')
      .addSelect('user.gender')
      .addSelect('user.phone')
      .addSelect('user.id')
      .addSelect('user.employeeId')
      .addSelect('user.dob')
      .addSelect('user.id_card')
      .addSelect('user.address')
      .addSelect('user.role')
      .addSelect('user.status')
      .getOne();
    return u;
  }
  async findUserByIdAndRole(id: number, role: number[]) {
    const u = await this.createQueryBuilder('user')
      .where('user.id= :id', { id: id })
      .andWhere('user.role IN (:role)', { role: role })
      .select('user.name')
      .addSelect('user.mail')
      .addSelect('user.employeeId')
      .addSelect('user.id')
      .addSelect('user.gender')
      .addSelect('user.phone')
      .addSelect('user.dob')
      .addSelect('user.id_card')
      .addSelect('user.address')
      .addSelect('user.role')
      .getOne();
    return u;
  }
  async editUserRole(id, role) {
    console.log(role.role);
    const u = await this.findUserById(id);
    if (!u) {
      throw new BadRequestException('USER NOT FOUND');
    }
    if (u.role !== Number(role.role)) {
      u.role = Number(role.role);
      console.log(111, u);
      await u.save();
      return u;
    } else
      throw new BadRequestException('NEW RULE MUST NOT THE SAME CURRENT ROLE');
  }
  async getListUser(data: ListUserDto) {
    let users = this.createQueryBuilder('user')
      .select('user')
      .select('user.id')
      .addSelect('user.name')
      .addSelect('user.mail')
      .addSelect('user.status')
      .addSelect('user.phone')
      .addSelect('user.role');

    if (data.search)
      users.where('user.name like :search or user.mail like :search ', {
        search: `%${data.search}%`,
      });

    if (data.roles) {
      let roles = data.roles.split(',').map((item) => Number(item));
      users.andWhere('user.role IN (:...roles)', { roles: roles });
    }

    if (String(data.sort) === 'asc') {
      users.orderBy(`user.name`, 'ASC');
    } else users.orderBy(`user.name`, 'DESC');
    return paginateRaw<User>(users, { limit: data.limit, page: data.page });
  }
}
