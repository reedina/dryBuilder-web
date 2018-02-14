import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/observable/throw';

import { PackerBuilderType } from '../models/packer-builder-type.model';

@Injectable()
export class PackerBuilderTypesService {
  constructor(private http: HttpClient) {}

  getPackerBuilderTypes(): Observable<PackerBuilderType[]> {
    return this.http
      .get<PackerBuilderType[]>(`http://localhost:7070/api/packer/builder/types`)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  createPackerBuilderType(payload: PackerBuilderType): Observable<PackerBuilderType> {
    return this.http
      .post<PackerBuilderType>(`http://localhost:7070/api/packer/builder/type`, payload)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  updatePackerBuilderType(payload: PackerBuilderType): Observable<PackerBuilderType> {
    return this.http
      .put<PackerBuilderType>(`http://localhost:7070/api/packer/builder/type/${payload.id}`, payload)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }


  removePackerBuilderType(payload: PackerBuilderType): Observable<PackerBuilderType> {
    return this.http
      .delete<any>(`http://localhost:7070/api/packer/builder/type/${payload.id}`)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

}
