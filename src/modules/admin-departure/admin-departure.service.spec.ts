import { Test, TestingModule } from '@nestjs/testing';
import { AdminDepartureService } from './admin-departure.service';

describe('AdminDepartureService', () => {
  let service: AdminDepartureService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminDepartureService],
    }).compile();

    service = module.get<AdminDepartureService>(AdminDepartureService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
