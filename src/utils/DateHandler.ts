export class DateHandler {
  private dateToHandle: Date;

  setDate(newDate: Date): DateHandler {
    this.dateToHandle = newDate;
    return this;
  }

  setDateWithString(newDate: string): DateHandler {
    this.dateToHandle = new Date(newDate);
    return this;
  }

  getStartOfTheMonth(): Date {
    return new Date(
      this.dateToHandle.getFullYear(),
      this.dateToHandle.getMonth(),
      1,
    );
  }

  getEndOfTheMonth(): Date {
    return new Date(
      this.dateToHandle.getFullYear(),
      this.dateToHandle.getMonth() + 1,
      0,
    );
  }
}
