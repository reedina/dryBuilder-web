import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/observable/throw';

import { AwsInstanceType } from '../models/aws-instance-type.model';

@Injectable()
export class AwsInstanceTypesService {
  constructor(private http: HttpClient) {}

  getAwsInstanceTypes(): Observable<AwsInstanceType[]> {
    return this.http
      .get<AwsInstanceType[]>(`http://localhost:7070/api/aws/instance/types`)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  createAwsInstanceType(payload: AwsInstanceType): Observable<AwsInstanceType> {
    return this.http
      .post<AwsInstanceType>(`http://localhost:7070/api/aws/instance/type`, payload)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  updateAwsInstanceType(payload: AwsInstanceType): Observable<AwsInstanceType> {
    return this.http
      .put<AwsInstanceType>(`http://localhost:7070/api/aws/instance/type/${payload.id}`, payload)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }


  removeAwsInstanceType(payload: AwsInstanceType): Observable<AwsInstanceType> {
    return this.http
      .delete<any>(`http://localhost:7070/api/aws/instance/type/${payload.id}`)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

}
