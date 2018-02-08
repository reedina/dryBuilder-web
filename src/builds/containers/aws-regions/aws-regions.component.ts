import { Component, OnInit } from '@angular/core';
import { AwsRegion } from '../../models/aws-region.model';

import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import { Observable } from 'rxjs/Observable';

@Component({
  styleUrls: ['aws-regions.component.css'],
  template: `
    <app-aws-regions-display [awsRegions]="awsRegions$ | async"></app-aws-regions-display>

  `
})
export class AwsRegionsComponent  implements OnInit {

  awsRegions$: Observable<AwsRegion[]>;

  constructor(private store: Store<fromStore.BuildState>) {}

  ngOnInit() {
      this.awsRegions$ = this.store.select(fromStore.getAwsRegionsEntities);
  }
}
