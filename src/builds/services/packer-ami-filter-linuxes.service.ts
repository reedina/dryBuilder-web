import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/observable/throw';

import { AmiFilterLinux } from '../models/packer-ami-filter-linux.model';

@Injectable()
export class AmiFilterLinuxesService {
  constructor(private http: HttpClient) {}

  getAmiFilterLinuxes(): Observable<AmiFilterLinux[]> {
    return this.http
      .get<AmiFilterLinux[]>(`http://localhost:7070/api/packer/ami/filter/linuxes`)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  createAmiFilterLinux(payload: AmiFilterLinux): Observable<AmiFilterLinux> {
    return this.http
      .post<AmiFilterLinux>(`http://localhost:7070/api/packer/ami/filter/linux`, payload)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  updateAmiFilterLinux(payload: AmiFilterLinux): Observable<AmiFilterLinux> {
    return this.http
      .put<AmiFilterLinux>(`http://localhost:7070/api/packer/ami/filter/linux/${payload.id}`, payload)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }


  removeAmiFilterLinux(payload: AmiFilterLinux): Observable<AmiFilterLinux> {
    return this.http
      .delete<any>(`http://localhost:7070/api/packer/ami/filter/linux/${payload.id}`)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

}
