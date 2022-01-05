import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UserRepository } from '../user/user.repository';
import { AdminUserController } from './admin-users.controller';
import { AdminUserService } from './admin-users.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository]), AuthModule],
  controllers: [AdminUserController],
  providers: [AdminUserService],
})
export class AdminUserModule {}
