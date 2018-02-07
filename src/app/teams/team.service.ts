import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import {ITeam} from './team'

@Injectable()
export class TeamService {

result: Array<any>;

  constructor(private http: Http) { }

  getTeams() {
        return this.http.get('/api/teams')
        .map(result => this.result  = result.json())
  }
  
  saveTeam(team: ITeam): Observable<ITeam> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.createTeam(team, options);
  }

  private createTeam(team: ITeam, options: RequestOptions): Observable<ITeam> {
    console.log(team)
      return this.http.post("/api/team", team, options)
      .map(this.extractData)
      .do(data => console.log('createProduct: ' + JSON.stringify(data)))
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
