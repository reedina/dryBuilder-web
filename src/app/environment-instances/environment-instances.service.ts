import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { IEnvironmentInstance, EnvironmentInstance } from './environment-instance'

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';


@Injectable()
export class EnvironmentInstancesService {
 
  result: Array<any>;

  constructor(private http: Http) { }

  getEnvironmentInstances() {
    return this.http.get('/api/environment/instances')
    .map(result => this.result  = result.json())
}

saveEnvironmentInstance(user: IEnvironmentInstance): Observable<IEnvironmentInstance> {
  let headers = new Headers({ 'Content-Type': 'application/json' });
  let options = new RequestOptions({ headers: headers });

  return this.createEnvironmentInstance(user, options);
}

private createEnvironmentInstance(user: IEnvironmentInstance, options: RequestOptions): Observable<IEnvironmentInstance> {
  console.log(user)
    return this.http.post("/api/environment/instance", user, options)
    .map(this.extractData)
    .do(data => console.log('create Environment Instance: ' + JSON.stringify(data)))
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
