import { Test, TestingModule } from '@nestjs/testing';
import { AdminEmployeeService } from './admin-users.service';

describe('AdminEmployeeService', () => {
  let service: AdminEmployeeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminEmployeeService],
    }).compile();

    service = module.get<AdminEmployeeService>(AdminEmployeeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
