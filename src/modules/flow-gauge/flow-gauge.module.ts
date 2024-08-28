import { Module } from '@nestjs/common';
import { FlowGaugeService } from './flow-gauge.service';
import { FlowGaugeController } from './flow-gauge.controller';

@Module({
  controllers: [FlowGaugeController],
  providers: [FlowGaugeService],
})
export class FlowGaugeModule {}
