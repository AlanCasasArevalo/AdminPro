import { Component } from '@angular/core';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

const my = new Date();

// This is for the range date picker
const equals = (one: NgbDateStruct, two: NgbDateStruct) =>
one && two && two.year === one.year && two.month === one.month && two.day === one.day;

const before = (one: NgbDateStruct, two: NgbDateStruct) =>
!one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
? false : one.day < two.day : one.month < two.month : one.year < two.year;

const after = (one: NgbDateStruct, two: NgbDateStruct) =>
!one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
? false : one.day > two.day : one.month > two.month : one.year > two.year;
// End  range date picker

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css'] 
})
export class DatepickerComponent {
  model: NgbDateStruct;
  model2;
  date: { year: number; month: number };

  // This is for multiple month
  displayMonths = 2;
  navigation = 'select';

  // This is for the disable datepicker
  model3: NgbDateStruct = {
    day: my.getDate(),
    month: my.getMonth() + 1,
    year: my.getFullYear(),
  };
  disabled = true;

  // This is for the range date picker
  hoveredDate: NgbDateStruct;

  fromDate: NgbDateStruct;
  toDate: NgbDateStruct;

  selectToday() {
    this.model = {
      day: my.getDate(),
      month: my.getMonth() + 1,
      year: my.getFullYear(),
    };
  }

  constructor(calendar: NgbCalendar) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  onDateChange(date: NgbDateStruct) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
      console.log('Fecha elegida por el usuario');
      console.log(date);
    } else if (this.fromDate && !this.toDate && after(date, this.fromDate)) {
      this.toDate = date;
      console.log('Fecha elegida por el usuario');
      console.log(date);
    } else {
      this.toDate = null;
      this.fromDate = date;
      console.log('Fecha elegida por el usuario');
      console.log(date);
    }
  }

  isHovered = date =>
    this.fromDate &&
    !this.toDate &&
    this.hoveredDate &&
    after(date, this.fromDate) &&
    before(date, this.hoveredDate)
  isInside = date => after(date, this.fromDate) && before(date, this.toDate);
  isFrom = date => equals(date, this.fromDate);
  isTo = date => equals(date, this.toDate);

}
