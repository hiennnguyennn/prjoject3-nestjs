import { Injectable } from '@nestjs/common';
import { DestinationRepository } from './destination.repository';

@Injectable()
export class DestinationService {
  constructor(private readonly destinationRepository: DestinationRepository) {}
  async getAll() {
    return this.destinationRepository.getList();
  }
  async getDestinationById(id: number) {
    return this.destinationRepository.getDestinationbyId(id);
  }
}
