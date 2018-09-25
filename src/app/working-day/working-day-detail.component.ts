import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { MatSnackBar } from '@angular/material';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

import { WorkingDay } from '../_model/index';
import { Schedule } from '../_model/index';

import { WorkingDayService } from '../_services/index';
import { ScheduleService } from '../_services/index';


@Component({
  selector: 'app-working-day-detail',
  templateUrl: './working-day-detail.component.html',
})
export class WorkingDayDetailComponent implements OnInit {
  constructor(private _workingDayService: WorkingDayService,
              private _scheduleService: ScheduleService,
              private _fb: FormBuilder,
              private _location: Location,
              private _route: ActivatedRoute,
              private _snackBar: MatSnackBar) {}

  private workingDay: WorkingDay;
  schedules: Schedule[] = [];
  private id_aux = 0;
  new = false;

  form = new FormGroup ({
    id: new FormControl(),
    name: new FormControl(),
    code: new FormControl(),
  });

  ngOnInit() {
    this.createForm();
    this.getWorkingDay();
  }

  createForm() {
    this.form = this._fb.group({
      id: [''],
      name: ['', Validators.required ],
      code: ['', Validators.required ]
    });
  }

  get id() { return this.form.get('id'); }
  get name() { return this.form.get('name'); }
  get code() { return this.form.get('code'); }

  getWorkingDay(): void {
    const id = this._route.snapshot.paramMap.get('id');
    if (id === 'new') {
      this.workingDay = new WorkingDay();
      this.new = true;
      return;
    }
    this._workingDayService.get(id)
    .subscribe(
      data => {
        this.workingDay = data;
        this.id.setValue(data.id);
        this.name.setValue(data.name);
        this.code.setValue(data.code);
        this.getSchedules();
      }
    );
  }

  save(): void {
    this.workingDay.name = this.name.value;
    this.workingDay.code = this.code.value;
    this._workingDayService.save(this.workingDay)
    .subscribe(
      (data: WorkingDay|any) => {
        if (data['status'] === 403) {
          this._snackBar.open('Not authorized', '', {
            duration: 3000,
            panelClass: 'snackBar-error'
          });
          return;
        }
        this.workingDay = data;
        this.new = false;
        this._snackBar.open('Working day saved', '', {
          duration: 3000,
          panelClass: 'snackBar-success'
        });
      }
    );
  }

  cancel () {
    this.back();
  }

  back () {
    this._location.back();
  }

  getSchedules(): void {
    if (this.workingDay.id === undefined) {
      return;
    }
    this._scheduleService.getAll(null, null, null, null, this.workingDay.id
    ).subscribe(
      data => {
        this.schedules = data;
      }
    );
  }

  onScheduleDelete(event): void {
    const index = this.schedules.indexOf(event, 0);
    if (index > -1) {
      this.schedules.splice(index, 1);
    }
  }

  newSchedule(): void {
    const schedule = new Schedule();
    schedule.id = --this.id_aux;
    schedule.workingDay = this.workingDay.id;
    this.schedules.push(schedule);
  }

}
