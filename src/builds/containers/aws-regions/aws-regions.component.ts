import { AwsRegionsService } from '../../services/aws-regions.service';
import { Component, OnInit } from '@angular/core';
import { AwsRegion } from '../../models/aws-region.model';

import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import { Observable } from 'rxjs/Observable';

@Component({
  styleUrls: ['aws-regions.component.css'],
  template: `
    <app-aws-regions-display [awsRegions]="awsR$ | async"></app-aws-regions-display>

  `
})
export class AwsRegionsComponent  implements OnInit {

  awsRegions$: Observable<AwsRegion[]>;
  awsR$: Observable<AwsRegion[]>;

  constructor(private store: Store<fromStore.BuildState>, private awsRegions: AwsRegionsService) {}

  ngOnInit() {
      this.awsRegions$ = this.store.select(fromStore.getAwsRegionsEntities);
      this.awsR$ = this.awsRegions.getAwsRegions();
  }
}
