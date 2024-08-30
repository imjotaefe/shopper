import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
} from '@nestjs/common';
import { MeasureService } from './measure.service';
import {
  confirmMeasure,
  confirmMeasureDTO,
  createMeasureDTO,
  measureSchema,
} from './Measure';
import { ValidationPipe } from '../../utils/Validation/ValidationPipe';

@Controller('measure')
export class MeasureController {
  constructor(private readonly measureService: MeasureService) {}

  @Post('/upload')
  @UsePipes(new ValidationPipe(measureSchema))
  async createMeasure(@Body() data: createMeasureDTO) {
    const { customer_code, image, measure_datetime, measure_type } = data;

    return this.measureService.createMeasure({
      customer_code,
      image,
      measure_datetime,
      measure_type,
    });
  }

  @Patch('/confirm')
  @UsePipes(new ValidationPipe(confirmMeasure))
  async confirmMeasure(@Body() data: confirmMeasureDTO) {
    const { measure_uuid, confirmed_value } = data;

    return this.measureService.confirmMeasure({
      measure_uuid,
      confirmed_value,
    });
  }

  @Get(':customer_code/list')
  @UsePipes(new ValidationPipe(measureSchema))
  async listMeasures(
    @Param('customer_code') customer_code: string,
    @Query() params: { measure_type: createMeasureDTO['measure_type'] },
  ) {
    return await this.measureService.listMeasures({
      customer_code: customer_code,
      measure_type: params.measure_type,
    });
  }
}
