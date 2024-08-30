import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { DateHandler } from 'src/utils/DateHandler';

@Injectable()
export class MeasureRepository {
  constructor(private prisma: PrismaService) {}

  async getMeasureByCustomerCodeMonthAndType({
    customer_code,
    measure_type,
    measure_datetime,
  }) {
    const dateHandler = new DateHandler().setDateWithString(measure_datetime);

    return await this.prisma.measure.findFirst({
      where: {
        customer_code: customer_code,
        measure_type: measure_type,
        measure_datetime: {
          gte: dateHandler.getStartOfTheMonth(),
          lte: dateHandler.getEndOfTheMonth(),
        },
      },
    });
  }

  async listByCustomerCodeAndMeasureType({ customer_code, measure_type }) {
    const measures = await this.prisma.measure.findMany({
      where: {
        customer_code: customer_code,
        measure_type: measure_type,
      },
    });
    return measures;
  }

  async getMeasureByUUID(measure_uuid: string) {
    return await this.prisma.measure.findFirst({
      where: {
        measure_uuid: measure_uuid,
      },
    });
  }

  async updateMeasureValue({ measure_uuid, measure_value }) {
    return await this.prisma.measure.update({
      where: {
        measure_uuid: measure_uuid,
      },
      data: {
        measure_value: measure_value,
        has_confirmed: true,
      },
    });
  }
}
