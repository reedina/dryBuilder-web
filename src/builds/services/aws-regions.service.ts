import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/observable/throw';

import { AwsRegion } from '../models/aws-region.model';

@Injectable()
export class AwsRegionsService {
  constructor(private http: HttpClient) {}

  getAwsRegions(): Observable<AwsRegion[]> {
    return this.http
      .get<AwsRegion[]>(`http://localhost:7070/api/aws/regions`)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  createAwsRegion(payload: AwsRegion): Observable<AwsRegion> {
    return this.http
      .post<AwsRegion>(`http://localhost:7070/api/aws/region`, payload)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }
/*
  updatePizza(payload: Pizza): Observable<Pizza> {
    return this.http
      .put<Pizza>(`/api/pizzas/${payload.id}`, payload)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  removePizza(payload: Pizza): Observable<Pizza> {
    return this.http
      .delete<any>(`/api/pizzas/${payload.id}`)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }
  */
}
