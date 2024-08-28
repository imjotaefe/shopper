import { Test, TestingModule } from '@nestjs/testing';
import { FlowGaugeController } from './flow-gauge.controller';
import { FlowGaugeService } from './flow-gauge.service';

describe('FlowGaugeController', () => {
  let controller: FlowGaugeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FlowGaugeController],
      providers: [FlowGaugeService],
    }).compile();

    controller = module.get<FlowGaugeController>(FlowGaugeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
