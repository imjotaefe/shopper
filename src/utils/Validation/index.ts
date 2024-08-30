import { validateBody } from './validateBody';
import { validateQuery } from './validateQuery';

export const validateGate = {
  query: (values) => validateQuery(values),
  body: (values, schema) => validateBody(values, schema),
  param: (values) => values,
  custom: (values) => values,
};
