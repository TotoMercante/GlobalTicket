import { Test, TestingModule } from '@nestjs/testing';
import { ManagerRequestController } from './manager-request.controller';
import { ManagerRequestService } from './manager-request.service';

describe('ManagerRequestController', () => {
  let controller: ManagerRequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManagerRequestController],
      providers: [ManagerRequestService],
    }).compile();

    controller = module.get<ManagerRequestController>(ManagerRequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
