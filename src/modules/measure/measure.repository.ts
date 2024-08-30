import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { DateHandler } from '../../utils/DateHandler';
import {
  CreateMeasure,
  GetMeasureByCustomerCodeMonthAndType,
  ListByCustomerCodeAndMeasureType,
  UpdateMeasureValue,
} from './types';

@Injectable()
export class MeasureRepository {
  constructor(private prisma: PrismaService) {}

  async getCustomer(uuid: string) {
    return await this.prisma.customer.findFirst({
      where: {
        customer_code: uuid,
      },
    });
  }

  async createCustomer(uuid: string) {
    return await this.prisma.customer.create({
      data: {
        customer_code: uuid,
      },
    });
  }

  async createMeasure({ measureData, imageUrl, measureValue }: CreateMeasure) {
    const { customer_code, measure_datetime, measure_type } = measureData;
    return await this.prisma.measure.create({
      data: {
        has_confirmed: false,
        image_url: imageUrl,
        measure_type: measure_type,
        measure_value: measureValue,
        created_at: new Date(),
        measure_datetime: measure_datetime,
        customer_code: customer_code,
        measure_uuid: crypto.randomUUID(),
      },
    });
  }

  async getMeasureByCustomerCodeMonthAndType({
    customer_code,
    measure_type,
    measure_datetime,
  }: GetMeasureByCustomerCodeMonthAndType) {
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

  async listByCustomerCodeAndMeasureType({
    customer_code,
    measure_type,
  }: ListByCustomerCodeAndMeasureType) {
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

  async updateMeasureValue({
    measure_uuid,
    measure_value,
  }: UpdateMeasureValue) {
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
