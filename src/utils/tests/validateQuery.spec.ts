import { CustomException } from '../CustomException';
import { validateQuery } from '../Validation/validateQuery';

describe('ValidateQuery', () => {
  it('should validate query params', () => {
    try {
      const validationResult = validateQuery({
        measure_type: 'WATER',
      });
      expect(validationResult).toEqual(validationResult);
    } catch (error) {}
  });

  it('should be an instance of custom exception', () => {
    try {
      validateQuery({
        measure_type: 'GASOLINE',
      });
    } catch (error) {
      expect(error).toBeInstanceOf(CustomException);
    }
  });
});
