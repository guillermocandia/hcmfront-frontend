import { API_URL } from '../../environments/environment';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { Sort } from '@angular/material';

import { Schedule } from '../_model/index';


@Injectable()
export class ScheduleService {

  URL = `${API_URL}schedule/`;

  constructor(private _http: HttpClient) { }

  getAll (limit: number, offset: number, sort?: Sort|null,
      active?: boolean|null, workingDay?: number|null): Observable<any> {

    let query = '?';

    if (limit !== null && offset !== null) {
      query += `limit=${limit}&offset=${offset}`;
    }

    if (sort !== null && sort.direction !== '') {
      query += `&ordering=${sort.direction === 'desc' ? '-' : ''}${sort.active}`;
    }

    if (active !== null) {
      query += `&active=${active}`;
    }

    if (workingDay !== null) {
      query += `&working_day=${workingDay}`;
    }

    const url = this.URL + query;
    return this._http.get(url)
    .pipe(
      tap(_ => console.log(`${this.constructor.name}: get ${url}`)),
      catchError(this.handleError(`${this.constructor.name}: get ${url}`))
    );
  }

  get(id: string): Observable<Schedule> {
    const url = `${this.URL}${id}/`;
    return this._http.get<Schedule>(url)
    .pipe(
      tap(_ => console.log(`${this.constructor.name}: get ${url}`)),
      catchError(this.handleError<Schedule>(`${this.constructor.name}: get ${url}`))
    );
  }

  save(schedule: Schedule) {
    let url: string;
    const body = {
      start: schedule.start,
      end: schedule.end,
      dayOfTheWeek: schedule.dayOfTheWeek,
      active: schedule.active,
      working_day: schedule.workingDay
    };

    if (schedule.id === undefined) {
       url = `${this.URL}`;
       return this._http.post(url, body)
       .pipe(
         tap(_ => console.log(`${this.constructor.name}: post ${url} body=${body}`)),
         catchError(this.handleError(`${this.constructor.name}: post ${url} body=${body}`))
       );
    } else {
       url = `${this.URL}${schedule.id}/`;
       return this._http.put(url, body)
       .pipe(
         tap(_ => console.log(`${this.constructor.name}: post ${url} body=${body}`)),
         catchError(this.handleError(`${this.constructor.name}: post ${url} body=${body}`))
       );
    }
  }

  delete(id: number) {
    const url = `${this.URL}${id}/`;
    return this._http.delete(url)
    .pipe(
      tap(_ => console.log(`${this.constructor.name}: delete ${url}`)),
      catchError(this.handleError(`${this.constructor.name}: delete ${url}`))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return Observable.of(error);
    };
  }

}
