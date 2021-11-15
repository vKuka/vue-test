export default class DateHelper {
  constructor(currentDate, pastDate) {
    this.currentDate = currentDate;
    this.pastDate = pastDate;
  }

  isSameYear() {
    return this.currentDate.getFullYear() === this.pastDate.getFullYear();
  }

  isSameMonth() {
    return this.isSameYear() && this.currentDate.getMonth() === this.pastDate.getMonth();
  }

  isSameDay() {
    return this.isDaysLeft(0) && this.currentDate.getDate() === this.pastDate.getDate();
  }

  isHourLeft() {
    return this.leftMinutes > 60;
  }

  isMinuteLeft() {
    return this.leftMinutes > 0;
  }

  isDaysLeft(days) {
    return this.leftDays === days;
  }

  get leftDays() {
    return Math.floor((this.currentDate - this.pastDate) / (1000 * 60 * 60 * 24));
  }

  get leftHours() {
    return Math.floor((this.currentDate - this.pastDate) / (1000 * 60 * 60));
  }

  get leftMinutes() {
    return Math.floor((this.currentDate - this.pastDate) / (1000 * 60));
  }
}
