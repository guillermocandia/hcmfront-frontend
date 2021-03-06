import { API_URL } from '../../environments/environment';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { Sort } from '@angular/material';

import { WorkingDay } from '../_model/index';


@Injectable()
export class WorkingDayService {

  URL = `${API_URL}working-day/`;

  constructor(private _http: HttpClient) { }

  getAll (limit: number, offset: number, sort?: Sort|null,
      active?: boolean|null): Observable<any> {

    let query = '';

    if (limit !== null && offset !== null) {
      query += `?limit=${limit}&offset=${offset}`;
    }

    if (sort !== null && sort.direction !== '') {
      query += `&ordering=${sort.direction === 'desc' ? '-' : ''}${sort.active}`;
    }

    if (active !== null) {
      query += `&active=${active}`;
    }

    const url = this.URL + query;
    return this._http.get(url)
    .pipe(
      tap(_ => console.log(`${this.constructor.name}: get ${url}`)),
      catchError(this.handleError(`${this.constructor.name}: get ${url}`))
    );
  }

  get(id: string): Observable<WorkingDay> {
    const url = `${this.URL}${id}/`;
    return this._http.get<WorkingDay>(url)
    .pipe(
      tap(_ => console.log(`${this.constructor.name}: get ${url}`)),
      catchError(this.handleError<WorkingDay>(`${this.constructor.name}: get ${url}`))
    );
  }

  save(workingDay: WorkingDay) {
    let url: string;
    const body = {
      name: workingDay.name,
      code: workingDay.code,
      active: workingDay.active,
    };

    if (workingDay.id === undefined) {
       url = `${this.URL}`;
       return this._http.post(url, body)
       .pipe(
         tap(_ => console.log(`${this.constructor.name}: post ${url} body=${body}`)),
         catchError(this.handleError(`${this.constructor.name}: post ${url} body=${body}`))
       );
    } else {
       url = `${this.URL}${workingDay.id}/`;
       return this._http.put(url, body)
       .pipe(
         tap(_ => console.log(`${this.constructor.name}: post ${url} body=${body}`)),
         catchError(this.handleError(`${this.constructor.name}: post ${url} body=${body}`))
       );
    }
  }

  delete(id: string) {
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
