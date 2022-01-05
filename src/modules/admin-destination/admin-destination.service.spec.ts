import { Test, TestingModule } from '@nestjs/testing';
import { AdminDestinationService } from './admin-destination.service';

describe('AdminDestinationService', () => {
  let service: AdminDestinationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminDestinationService],
    }).compile();

    service = module.get<AdminDestinationService>(AdminDestinationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
