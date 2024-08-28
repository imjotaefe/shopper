import { Injectable } from '@nestjs/common';
import { createFlowGaugeDTO } from './FlowGauge';

@Injectable()
export class FlowGaugeService {
  async newReport(data: createFlowGaugeDTO) {
    const { customer_code, image, measure_datetime, measure_type } = data;
    console.log(customer_code, measure_type, measure_datetime, image);
  }

  async listReports(data: createFlowGaugeDTO) {
    const { customer_code, image, measure_datetime, measure_type } = data;
    console.log(customer_code, measure_type, measure_datetime, image);
  }
}
