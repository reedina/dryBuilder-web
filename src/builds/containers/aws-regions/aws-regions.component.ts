import { AwsRegionsService } from '../../services/aws-regions.service';
import { Component, OnInit } from '@angular/core';
import { AwsRegion } from '../../models/aws-region.model';
import { FormStatus, FormStatusClass } from '../../models/form-status.model';

import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import { Observable } from 'rxjs/Observable';

@Component({
  styleUrls: ['aws-regions.component.css'],
  template: `
    <app-aws-regions-display [awsRegions]="awsRegions$ | async" (create)="submitForm($event)"
       [formSubmittedStatus]="submittedStatus"></app-aws-regions-display>

  `
})
export class AwsRegionsComponent  implements OnInit {

  awsRegions$: Observable<AwsRegion[]>;
  awsR$: Observable<AwsRegion[]>;
  submittedStatus: FormStatus = new FormStatusClass();

  constructor(private store: Store<fromStore.BuildState>, private awsRegions: AwsRegionsService) {}

  ngOnInit() {
      this.store.dispatch(new fromStore.LoadAwsRegions());
      this.awsRegions$ = this.store.select(fromStore.getAwsRegionsEntities);
      // this.awsR$ = this.awsRegions.getAwsRegions();
  }

  submitForm(awsRegion: AwsRegion) {
    this.awsRegions.createAwsRegion(awsRegion).subscribe( ()  => { 
      this.submittedStatus = new FormStatusClass(true, true, false);
    });
    
  }
}
