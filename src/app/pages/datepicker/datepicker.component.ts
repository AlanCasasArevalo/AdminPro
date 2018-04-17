import { Component, EventEmitter, Output } from '@angular/core';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css']
})
export class DatepickerComponent {

  @Output() dateSelected = new EventEmitter<string>();

  selectDate(event) {
    this.dateSelected.emit(event.value);
  }

}
