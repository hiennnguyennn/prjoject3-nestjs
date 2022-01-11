import { Injectable } from '@nestjs/common';
import { EditUserDto } from './dto/edit.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async getInfo(id) {
    let u = await this.userRepository.getMyInfo(id);
    delete u.password;
    return u;
  }
  async editProfile(data: EditUserDto, id) {
    let u = await this.userRepository.getMyInfo(id);
    u = Object.assign(u, data);

    await u.save();
    return u;
  }
}
