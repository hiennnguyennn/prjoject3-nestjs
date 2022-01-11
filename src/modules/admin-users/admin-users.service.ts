import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import { EditUserTypeDto } from './dto/editUserType.dto';
import { ListUserDto } from './dto/listUser.dto';

@Injectable()
export class AdminUserService {
  constructor(private readonly userRepository: UserRepository) {}
  editUserRole(id, role) {
    return this.userRepository.editUserRole(id, role);
  }
  async editUserStatus(id) {
    let u = await this.userRepository.findUserById(id);

    u.status = 1 - u.status;
    await u.save();
    return u;
  }
  getListUser(data: ListUserDto) {
    return this.userRepository.getListUser(data);
  }
  getUserDetail(id: number) {
    return this.userRepository.findUserById(id);
  }
}
