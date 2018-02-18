import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/observable/throw';

import { EbsBuilder } from '../models/ebs-builder.model';

@Injectable()
export class EbsBuildersService {
  constructor(private http: HttpClient) {}

  getEbsBuilders(): Observable<EbsBuilder[]> {
    return this.http
      .get<EbsBuilder[]>(`http://localhost:7070/api/packer/builder/ebses`)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  createEbsBuilder(payload: EbsBuilder): Observable<EbsBuilder> {
    return this.http
      .post<EbsBuilder>(`http://localhost:7070/api/packer/builder/ebs`, payload)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  updateEbsBuilder(payload: EbsBuilder): Observable<EbsBuilder> {
    return this.http
      .put<EbsBuilder>(`http://localhost:7070/api/packer/builder/ebs/${payload.id}`, payload)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }


  removeEbsBuilder(payload: EbsBuilder): Observable<EbsBuilder> {
    return this.http
      .delete<any>(`http://localhost:7070/api/packer/builder/ebs/${payload.id}`)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

}
