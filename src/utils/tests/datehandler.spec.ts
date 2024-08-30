import { DateHandler } from '../DateHandler';

describe('DateHandler', () => {
  let dateHandler: DateHandler;

  beforeEach(async () => {
    dateHandler = new DateHandler();
  });

  it('should get the start and the end of the month', () => {
    dateHandler.setDateWithString('2024-08-29T18:33:35.000Z');
    const endOfTheMonth = dateHandler.getEndOfTheMonth();
    const startOfTheMonth = dateHandler.getStartOfTheMonth();

    expect(endOfTheMonth).toEqual(new Date('2024-08-31T03:00:00.000Z'));
    expect(startOfTheMonth).toEqual(new Date('2024-08-01T03:00:00.000Z'));
  });
});
