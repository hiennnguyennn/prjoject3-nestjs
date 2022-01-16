import { Injectable } from '@nestjs/common';
import { ReviewRepository } from '../tour/review.repository';
import { ListReviewDto } from './dto/list.dto';

@Injectable()
export class AdminReviewService {
  constructor(private readonly reviewRepository: ReviewRepository) {}
  async getList(data: ListReviewDto) {
    return this.reviewRepository.getList(data);
  }
}
