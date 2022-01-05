import { Injectable } from '@nestjs/common';
import { TourRepository } from './tour.repository';

@Injectable()
export class TourService {
  constructor(private readonly tourRepository: TourRepository) {}
  async getAll() {
    return this.tourRepository.getList();
  }
  async getOne(id: number) {
    return this.tourRepository.getTourById(id);
  }
}
