import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

import { MatSnackBar } from '@angular/material';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';

import { ScheduleService } from '../_services/index';

import { Schedule } from '../_model/index';
import { WorkingDay } from '../_model/index';


@Component({
  selector: '[app-schedule-detail]', // tslint:disable-line
  templateUrl: './schedule-detail.component.html'
})
export class ScheduleDetailComponent implements OnInit {

  constructor(private _scheduleService: ScheduleService,
              private _snackBar: MatSnackBar) {}

  @Input() schedule: Schedule = null;
  @Input() workingDay: number;
  @Output() scheduleDelete: EventEmitter<Schedule> = new EventEmitter();

  new = false;
  editing = false;

  days: any[] = [
    {name: 'Monday', id: 1},
    {name: 'Tuesday', id: 2},
    {name: 'Wednesday', id: 3},
    {name: 'Thursday', id: 4},
    {name: 'Friday', id: 5},
    {name: 'Saturday', id: 6},
    {name: 'Sunday', id: 7}
  ];


  id = new FormControl(null);
  start = new FormControl(null, [Validators.required]);
  end = new FormControl(null, [Validators.required]);
  dayOfTheWeek = new FormControl('', [Validators.required]);
  active = new FormControl(true, [Validators.required]);

  form = new FormGroup ({
    id: this.id,
    start: this.start,
    end: this.end,
    dayOfTheWeek: this.dayOfTheWeek,
    active: this.active,
  });


  ngOnInit() {
    console.log(`${this.constructor.name}: ngOnInit`);
    this.setUp();
  }


  setUp() {
    if (this.schedule.id <= 0) {
      this.new = true;
      this.editing = true;
    } else {
      this.id.setValue(this.schedule.id);
      this.start.setValue(this.schedule.start);
      this.end.setValue(this.schedule.end);
      this.dayOfTheWeek.setValue(Number(this.schedule.dayOfTheWeek));
      this.active.setValue(this.schedule.active);
      this.editing = false;
      this.new = false;
      this.form.disable();
    }
  }


  save(): void {
    this.schedule.start = this.start.value;
    this.schedule.end = this.end.value;
    this.schedule.dayOfTheWeek = this.dayOfTheWeek.value;
    this.schedule.active = this.active.value;
    this.schedule.workingDay = this.workingDay;
    if (this.schedule.id <= 0) {
      this.schedule.id = undefined;
    }
    this._scheduleService.save(this.schedule)
    .subscribe(
      (data: Schedule|any) => {
        this.schedule.id = data.id;
        this._snackBar.open('Schedule saved', '', {
          duration: 3000,
          panelClass: 'snackBar-success'
        });
        this.form.disable();
        this.editing = false;
        this.new = false;
      }
    );
  }

  delete(): void {
    if (this.schedule.id > 0) {
      this._scheduleService.delete(this.schedule.id)
      .subscribe(
        _ => {
          this.scheduleDelete.emit(this.schedule);
        }
      );
    } else {
      this.scheduleDelete.emit(this.schedule);
    }

    this._snackBar.open('Schedule deleted', '', {
      duration: 3000,
      panelClass: 'snackBar-success'
    });
  }

  edit(): void {
    this.editing = true;
    this.form.enable();
  }

  cancel(): void {
    if (this.new) {
      this.scheduleDelete.emit(this.schedule);
      return;
    }

    this.form.disable();
    this.editing = false;
    this.start.setValue(this.schedule.start);
    this.end.setValue(this.schedule.end);
    this.dayOfTheWeek.setValue(this.schedule.dayOfTheWeek);
    this.active.setValue(this.schedule.active);
  }

}
