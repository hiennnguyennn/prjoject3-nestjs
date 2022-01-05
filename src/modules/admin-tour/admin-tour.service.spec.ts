import { Test, TestingModule } from '@nestjs/testing';
import { AdminTourService } from './admin-tour.service';

describe('AdminTourService', () => {
  let service: AdminTourService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminTourService],
    }).compile();

    service = module.get<AdminTourService>(AdminTourService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
