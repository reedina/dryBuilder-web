import { AwsRegionsService } from '../../services/aws-regions.service';
import { Component, OnInit } from '@angular/core';
import { AwsRegion } from '../../models/aws-region.model';

import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import { Observable } from 'rxjs/Observable';

@Component({
  styleUrls: ['aws-regions.component.css'],
  template: `
    <app-aws-regions-display [awsRegions]="awsRegions$ | async" (create)="submitForm($event)"></app-aws-regions-display>
  `
})
export class AwsRegionsComponent  implements OnInit {

  awsRegions$: Observable<AwsRegion[]>;

  constructor(private store: Store<fromStore.BuildState>, private awsRegions: AwsRegionsService) {}

  ngOnInit() {
      this.store.dispatch(new fromStore.LoadAwsRegions());
      this.awsRegions$ = this.store.select(fromStore.getAllAwsRegions);
       this.store.select(fromStore.getQueryParamsEdit).subscribe(x => console.log(x));
  }

  submitForm(awsRegion: AwsRegion) {
    this.store.dispatch(new fromStore.CreateAwsRegion(awsRegion));
  }
}
