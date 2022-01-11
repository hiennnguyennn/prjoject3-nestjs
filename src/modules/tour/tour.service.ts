import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '../admin-category/category.repository';
import { DestinationRepository } from '../destination/destination.repository';
import { ListTourInUserDto } from './dto/list.dto';
import { ReviewRepository } from './review.repository';

import { TourRepository } from './tour.repository';

@Injectable()
export class TourService {
  constructor(
    private readonly tourRepository: TourRepository,
    private readonly categoryRepository: CategoryRepository,
    private readonly reviewRepository: ReviewRepository,
    private readonly destinationRepository: DestinationRepository,
  ) {}
  async getAll(data: ListTourInUserDto) {
    let tours = await this.tourRepository.getListInUser(data);
    for (var i = 0; i < tours.items.length; i++) {
      tours.items[i]['tour_image'] = tours.items[i]['tour_image'].split(',');
    }
    let desFilter;
    if (data.destination)
      desFilter = await this.destinationRepository.getDestinationbyId(
        data.destination,
      );
    let c = await this.categoryRepository.getAll();
    let des = await this.destinationRepository.getList();
    return { tours, c, des, desFilter };
  }
  async getOne(id: number) {
    return this.tourRepository.getTourById(id);
  }
  async saveReview(data) {
    await this.reviewRepository.save(data);
  }
}
