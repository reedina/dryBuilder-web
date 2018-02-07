import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import {IEnvironment, Environment} from './environment';


@Injectable()
export class EnvironmentService {

  result: Array<any>;
  
    constructor(private http: Http) { }

    getEnvironments() {
      return this.http.get('/api/environments')
      .map(result => this.result  = result.json())
}    

saveEnvironment(environment: IEnvironment): Observable<IEnvironment> {
  let headers = new Headers({ 'Content-Type': 'application/json' });
  let options = new RequestOptions({ headers: headers });

  return this.createEnvironment(environment, options);
}

private createEnvironment(environment: IEnvironment, options: RequestOptions): Observable<IEnvironment> {
  console.log(environment)
    return this.http.post("/api/environment", environment, options)
    .map(this.extractData)
    .do(data => console.log('create Environment: ' + JSON.stringify(data)))
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
