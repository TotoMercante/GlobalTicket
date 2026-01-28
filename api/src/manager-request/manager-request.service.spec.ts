import { Test, TestingModule } from '@nestjs/testing';
import { ManagerRequestService } from './manager-request.service';

describe('ManagerRequestService', () => {
  let service: ManagerRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManagerRequestService],
    }).compile();

    service = module.get<ManagerRequestService>(ManagerRequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
