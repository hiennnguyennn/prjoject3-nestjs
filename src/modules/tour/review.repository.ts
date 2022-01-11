import { EntityRepository, Repository } from 'typeorm';
import { Review } from './entities/review.entity';

@EntityRepository(Review)
export class ReviewRepository extends Repository<Review> {
  async createReview(data) {
    await this.save(data);
  }
}
