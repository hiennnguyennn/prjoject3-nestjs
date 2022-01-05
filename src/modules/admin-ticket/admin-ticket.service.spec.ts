import { Test, TestingModule } from '@nestjs/testing';
import { AdminTicketService } from './admin-ticket.service';

describe('AdminTicketService', () => {
  let service: AdminTicketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminTicketService],
    }).compile();

    service = module.get<AdminTicketService>(AdminTicketService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
