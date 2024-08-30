import { createMeasureDTO } from './Measure';

export interface CreateMeasure {
  measureData: createMeasureDTO;
  imageUrl: string;
  measureValue: number;
}

export interface GetMeasureByCustomerCodeMonthAndType {
  customer_code: createMeasureDTO['customer_code'];
  measure_type: createMeasureDTO['measure_type'];
  measure_datetime: createMeasureDTO['measure_datetime'];
}

export interface ListByCustomerCodeAndMeasureType {
  customer_code: createMeasureDTO['customer_code'];
  measure_type: createMeasureDTO['measure_type'];
}

export interface UpdateMeasureValue {
  measure_uuid: string;
  measure_value: number;
}
