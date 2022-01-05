import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Auth } from 'src/common/decorator/auth.decorator';
import { UserRepository } from '../user/user.repository';
import { AdminCategoryController } from './admin-category.controller';
import { AdminCategoryService } from './admin-category.service';
import { CategoryRepository } from './category.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository, CategoryRepository]),
    AuthModule,
  ],
  controllers: [AdminCategoryController],
  providers: [AdminCategoryService],
})
export class AdminCategoryModule {}
