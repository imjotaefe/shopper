import { measure_type } from 'src/modules/flow-gauge/FlowGauge';

export interface ValidateMeasureThisMonth {
  userId: string;
  month: string;
  measure_type: typeof measure_type;
}

export const CheckIfAlreadyExistSomeMeasureThisMonth = ({}) => {
  //TODO: the validation code;

  return false;
};
