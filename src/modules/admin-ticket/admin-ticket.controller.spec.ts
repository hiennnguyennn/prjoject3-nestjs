import { Test, TestingModule } from '@nestjs/testing';
import { AdminTicketController } from './admin-ticket.controller';

describe('AdminTicketController', () => {
  let controller: AdminTicketController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminTicketController],
    }).compile();

    controller = module.get<AdminTicketController>(AdminTicketController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
