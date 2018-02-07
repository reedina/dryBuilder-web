import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { IUser } from './user'

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

@Injectable()
export class UserService {

  result: Array<any>;

  constructor(private http: Http) { }

  getUsers() {
    //return this.http.get('http://localhost:4040/api/users')
    return this.http.get('/api/users')
    .map(result => this.result  = result.json())
}

saveUser(user: IUser): Observable<IUser> {
  let headers = new Headers({ 'Content-Type': 'application/json' });
  let options = new RequestOptions({ headers: headers });

  return this.createUser(user, options);
}

private createUser(user: IUser, options: RequestOptions): Observable<IUser> {
  console.log(user)
  //return this.http.post("http://localhost:4040/api/user", user, options)
    return this.http.post("/api/user", user, options)
    .map(this.extractData)
    .do(data => console.log('create User: ' + JSON.stringify(data)))
    .catch(this.handleError);
  }

  private extractData(response: Response) {
    let body = response.json();
    return body || {};
  }
  
  private handleError(error: Response): Observable<any> {
    console.error(error);  // Send to logging server at some point
    return Observable.throw(error.json().error || 'Server error');
  }
}
