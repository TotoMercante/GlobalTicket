import { Test, TestingModule } from '@nestjs/testing';
import { EventTicketController } from './event-ticket.controller';
import { EventTicketService } from './event-ticket.service';

describe('EventTicketController', () => {
  let controller: EventTicketController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventTicketController],
      providers: [EventTicketService],
    }).compile();

    controller = module.get<EventTicketController>(EventTicketController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
