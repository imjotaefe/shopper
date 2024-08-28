import { measure_type } from 'src/modules/flow-gauge/FlowGauge';
import { CustomException } from '../CustomException';

export function validateQuery(values: unknown) {
  const typesToCheck = String(measure_type).split(',');
  const measureType = values['measure_type'];

  try {
    if (measureType && measureType.length > 0) {
      if (!typesToCheck.includes(measureType)) {
        throw new Error();
      }
    }
    return values;
  } catch (error) {
    throw new CustomException({
      errorCode: 'INVALID_TYPE',
      errorDescription: 'Tipo de medição não permitida',
      statusCode: 400,
    });
  }
}
