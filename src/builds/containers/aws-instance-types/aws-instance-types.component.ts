import { AwsInstanceTypesService } from '../../services/aws-instance-types.service';
import { Component, OnInit } from '@angular/core';
import { AwsInstanceType } from '../../models/aws-instance-type.model';

import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import { Observable } from 'rxjs/Observable';

@Component({
  styleUrls: ['aws-instance-types.component.css'],
  template: `
    <app-aws-instance-types-display
        [awsInstanceTypes]="awsInstanceTypes$ | async"
        (create)="submitForm($event)"
        [awsInstanceTypeEdit]="awsInstanceType$ | async"
        (updateAwsInstanceType)="updateForm($event)"
        (remove)="onRemove($event)">
    </app-aws-instance-types-display>
  `
})
export class AwsInstanceTypesComponent  implements OnInit {

  awsInstanceTypes$: Observable<AwsInstanceType[]>;
  awsInstanceType$: Observable<AwsInstanceType>;

  constructor(private store: Store<fromStore.BuildState>, private awsInstanceTypes: AwsInstanceTypesService) {}

  ngOnInit() {
      this.store.dispatch(new fromStore.LoadAwsInstanceTypes());
      this.awsInstanceTypes$ = this.store.select(fromStore.getAllAwsInstanceTypes);
      this.awsInstanceType$ = this.store.select(fromStore.getSelectedInstanceType);
      // this.store.select(fromStore.getQueryParamsEdit).subscribe(x => console.log(x.edit));
  }

  submitForm(awsInstanceType: AwsInstanceType) {
    this.store.dispatch(new fromStore.CreateAwsInstanceType(awsInstanceType));
  }

  updateForm(awsInstanceType: AwsInstanceType) {
    this.store.dispatch(new fromStore.UpdateAwsInstanceType(awsInstanceType));
  }

  onRemove(awsInstanceType: AwsInstanceType) {
    this.store.dispatch(new fromStore.RemoveAwsInstanceType(awsInstanceType));
  }
}
