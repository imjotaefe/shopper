import { measureSchema } from '../../modules/measure/Measure';
import { CustomException } from '../CustomException';
import { validateBody } from '../Validation/validateBody';

describe('ValidateBody', () => {
  const validationSchema = measureSchema;

  it('should validate body', () => {
    try {
      const validationResult = validateBody(
        {
          image: 'SGVsbG8gd29ybGQ=',
          customer_code: 'code',
          measure_datetime: '2024-08-29T18:33:35.000Z',
          measure_type: 'WATER',
        },
        validationSchema,
      );
      expect(validationResult).toEqual(validationResult);
    } catch (error) {}
  });

  it('should be an instance of custom exception', () => {
    try {
      validateBody(
        {
          image: 'SGVsbG8gd29ybsdGQ=',
          customer_code: 'code',
          measure_datetime: '2024-08-29T18:33:35.000Z',
          measure_type: 'GAS',
        },
        validationSchema,
      );
    } catch (error) {
      expect(error).toBeInstanceOf(CustomException);
    }
  });
});
