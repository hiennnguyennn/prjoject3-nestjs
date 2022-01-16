import { Injectable } from '@nestjs/common';
import { TicketRepository } from '../tour/ticket.repository';
import { EditUserDto } from './dto/edit.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly ticketRepository: TicketRepository,
  ) {}
  async getInfo(id) {
    let u = await this.userRepository.getMyInfo(id);
    let ticket = await this.ticketRepository.getUserTicket(id);

    delete u.password;
    return { u, ticket };
  }
  async editProfile(data: EditUserDto, id) {
    let u = await this.userRepository.getMyInfo(id);
    u = Object.assign(u, data);

    await u.save();
    return u;
  }
}
