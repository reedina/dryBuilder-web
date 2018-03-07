import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/observable/throw';

import { UserDataFile } from '../models/user-data-file.model';

@Injectable()
export class UserDataFilesService {
  constructor(private http: HttpClient) {}

  getUserDataFiles(): Observable<UserDataFile[]> {
    return this.http
      .get<UserDataFile[]>(`http://localhost:7070/api/packer/builder/userDataFiles`)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  createUserDataFile(payload: UserDataFile): Observable<UserDataFile> {
    return this.http
      .post<UserDataFile>(`http://localhost:7070/api/packer/builder/userDataFile`, payload)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  updateUserDataFile(payload: UserDataFile): Observable<UserDataFile> {
    return this.http
      .put<UserDataFile>(`http://localhost:7070/api/packer/builder/userDataFile/${payload.id}`, payload)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }


  removeUserDataFile(payload: UserDataFile): Observable<UserDataFile> {
    return this.http
      .delete<any>(`http://localhost:7070/api/packer/builder/userDataFile/${payload.id}`)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

}
