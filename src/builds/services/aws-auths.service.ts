import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/observable/throw';

import { AwsAuth } from '../models/aws-auth.model';

@Injectable()
export class AwsAuthsService {
  constructor(private http: HttpClient) {}

  getAwsAuths(): Observable<AwsAuth[]> {
    return this.http
      .get<AwsAuth[]>(`http://localhost:7070/api/aws/auths`)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  createAwsAuth(payload: AwsAuth): Observable<AwsAuth> {
    return this.http
      .post<AwsAuth>(`http://localhost:7070/api/aws/auth`, payload)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  updateAwsAuth(payload: AwsAuth): Observable<AwsAuth> {
    return this.http
      .put<AwsAuth>(`http://localhost:7070/api/aws/auth/${payload.id}`, payload)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }


  removeAwsAuth(payload: AwsAuth): Observable<AwsAuth> {
    return this.http
      .delete<any>(`http://localhost:7070/api/aws/auth/${payload.id}`)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

}
