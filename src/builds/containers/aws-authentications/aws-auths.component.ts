import { getAllAwsAuths } from './../../store/selectors/aws-auth.selectors';
import { AwsAuthsService } from '../../services/aws-auths.service';
import { Component, OnInit } from '@angular/core';
import { AwsAuth } from '../../models/aws-auth.model';

import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import { Observable } from 'rxjs/Observable';

@Component({
  styleUrls: ['aws-auths.component.css'],
  template: `
    <app-aws-auths-display
        [awsAuths]="awsAuths$ | async"
        (create)="submitForm($event)"
        [awsAuthEdit]="awsAuth$ | async"
        (updateAwsAuth)="updateForm($event)"
        (remove)="onRemove($event)">
    </app-aws-auths-display>
  `
})
export class AwsAuthsComponent  implements OnInit {

  awsAuths$: Observable<AwsAuth[]>;
  awsAuth$: Observable<AwsAuth>;

  constructor(private store: Store<fromStore.BuildState>, private awsAuths: AwsAuthsService) {}

  ngOnInit() {
      this.store.dispatch(new fromStore.LoadAwsAuths());
      this.awsAuths$ = this.store.select(fromStore.getAllAwsAuths);
      this.awsAuth$ = this.store.select(fromStore.getSelectedAuth);
      // this.store.select(fromStore.getQueryParamsEdit).subscribe(x => console.log(x.edit));
  }

  submitForm(awsAuth: AwsAuth) {
    this.store.dispatch(new fromStore.CreateAwsAuth(awsAuth));
  }

  updateForm(awsAuth: AwsAuth) {
    this.store.dispatch(new fromStore.UpdateAwsAuth(awsAuth));
  }

  onRemove(awsAuth: AwsAuth) {
    this.store.dispatch(new fromStore.RemoveAwsAuth(awsAuth));
  }
}
