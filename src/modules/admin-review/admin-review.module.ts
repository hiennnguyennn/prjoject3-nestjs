import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ReviewRepository } from '../tour/review.repository';
import { AdminReviewController } from './admin-review.controller';
import { AdminReviewService } from './admin-review.service';

@Module({
  imports: [TypeOrmModule.forFeature([ReviewRepository]), AuthModule],
  controllers: [AdminReviewController],
  providers: [AdminReviewService],
})
export class AdminReviewModule {}
