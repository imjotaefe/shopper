import { Test, TestingModule } from '@nestjs/testing';
import { FlowGaugeService } from './flow-gauge.service';

describe('FlowGaugeService', () => {
  let service: FlowGaugeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FlowGaugeService],
    }).compile();

    service = module.get<FlowGaugeService>(FlowGaugeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
