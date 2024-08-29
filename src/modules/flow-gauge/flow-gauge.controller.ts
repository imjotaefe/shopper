import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UsePipes,
} from '@nestjs/common';
import { FlowGaugeService } from './flow-gauge.service';
import { createFlowGaugeDTO, flowGaugeSchema } from './FlowGauge';
import { ValidationPipe } from 'src/utils/Validation/ValidationPipe';

@Controller('flow-gauge')
export class FlowGaugeController {
  constructor(private readonly flowGaugeService: FlowGaugeService) {}

  @Post('/upload')
  @UsePipes(new ValidationPipe(flowGaugeSchema))
  async newReport(@Body() data: createFlowGaugeDTO) {
    const { customer_code, image, measure_datetime, measure_type } = data;

    return this.flowGaugeService.newReport({
      customer_code,
      image,
      measure_datetime,
      measure_type,
    });
  }

  @Get('/:id/list')
  @UsePipes(new ValidationPipe(flowGaugeSchema))
  async listReports(
    @Param('id') id: number,
    @Query() params: { measure_type: string },
  ) {}
}
