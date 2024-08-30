export class DateHandler {
  private dateToHandle: Date;

  setDate(newDate: Date) {
    this.dateToHandle = newDate;
    return this;
  }

  setDateWithString(newDate: string) {
    this.dateToHandle = new Date(newDate);
    return this;
  }

  getStartOfTheMonth() {
    return new Date(
      this.dateToHandle.getFullYear(),
      this.dateToHandle.getMonth(),
      1,
    );
  }

  getEndOfTheMonth() {
    return new Date(
      this.dateToHandle.getFullYear(),
      this.dateToHandle.getMonth() + 1,
      0,
    );
  }
}
