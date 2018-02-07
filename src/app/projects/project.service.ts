import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { IProject } from './project';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

@Injectable()
export class ProjectService {

  result: Array<any>;

  constructor(private http: Http) { }

  getProjects() {
    return this.http.get('/api/projects')
    .map(result => this.result  = result.json())
}
saveProject(project: IProject): Observable<IProject> {
  let headers = new Headers({ 'Content-Type': 'application/json' });
  let options = new RequestOptions({ headers: headers });

  return this.createProject(project, options);
}

private createProject(project: IProject, options: RequestOptions): Observable<IProject> {
  console.log(project)
    return this.http.post("/api/project", project, options)
    .map(this.extractData)
    .do(data => console.log('create project: ' + JSON.stringify(data)))
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
