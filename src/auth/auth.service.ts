import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/modules/user/user.repository';
import { LoginDto } from './dto/login.dto';
import { RegisterCustomerDto } from './dto/register.customer.dto';
import * as bcrypt from 'bcrypt';
import { RegisterAdminDto } from './dto/register.admin.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userRepository: UserRepository,
  ) {}

  async registerUser(data: RegisterCustomerDto) {
    if (await this.userRepository.findUserByEmail(data.mail)) {
      throw new BadRequestException('EMAIL EXIST');
    } else {
      const saltOrRounds = 10;
      data.password = await bcrypt.hash(data.password, saltOrRounds);
      data['role'] = 0;
      const u = await this.userRepository.save(data);
      const payload = {
        id: u.id,
        mail: u.mail,
        role: u.role,
        salt: 'ajshdjshdjnzdskje',
      };
      const jwt = await this.jwtService.sign(payload);
      return jwt;
    }
  }
  async login(u) {
    const payload = {
      id: u.id,
      mail: u.mail,

      role: u.role,
      salt: 'ajshdjshdjnzdskje',
    };
    const jwt = await this.jwtService.sign(payload);
    return jwt;
  }
  async validateUser(email, password) {
    const u = await this.userRepository.findUserByEmailAndRole(email, [0]);
    if (u && (await bcrypt.compare(password, u.password))) {
      delete u.password;
      return u;
    }
    return null;
  }
  async registerAdmin(data: RegisterAdminDto) {
    if (await this.userRepository.findUserByEmail(data.mail)) {
      throw new BadRequestException('EMAIL EXIST');
    } else if (
      await this.userRepository.findStaffByEmployeeId(data.employeeId)
    ) {
      throw new BadRequestException('EMPLOYEE ID EXIST');
    } else {
      const saltOrRounds = 10;
      data.password = await bcrypt.hash(data.password, await bcrypt.genSalt());
      data['role'] = 1;
      const u = await this.userRepository.save(data);
      const payload = {
        id: u.id,
        mail: u.mail,
        role: u.role,
        salt: 'ajshdjshdjnzdskje',
      };
      const jwt = await this.jwtService.sign(payload);
      return jwt;
    }
  }
  async loginAdmin(data: LoginDto) {
    console.log(111, data);
    const u = await this.userRepository.findUserByEmailAndRole(
      data.mail,
      [1, 2],
    );
    console.log(222, u);
    if (u && (await bcrypt.compare(data.password, u.password))) {
      delete u.password;
      const payload = {
        id: u.id,
        mail: u.mail,
        role: u.role,
        salt: 'ajshdjshdjnzdskje',
      };
      const jwt = await this.jwtService.sign(payload);
      return jwt;
    } else throw new UnauthorizedException();
  }
  findUser(mail: string, role: number, id: number) {
    const u = this.userRepository
      .createQueryBuilder('user')
      .where('user.id= :id', { id: id })
      .andWhere('user.mail= :mail', { mail: mail })
      .andWhere('user.role= :role', { role: role })
      .select('user.mail')
      .addSelect('user.id')
      .addSelect('user.role')
      .addSelect('user.name')
      // .addSelect('user')
      .getOne();
    return u;
  }
  async checkRole(id: number, role: number[]) {
    const u = await this.userRepository.findUserByIdAndRole(id, role);
    if (u) return true;
    else return false;
  }
}
