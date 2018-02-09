import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

import * as fromRoot from '../../../app/store';
import * as awsRegionsActions from '../actions/aws-region.actions';
import * as fromServices from '../../services';
import { AwsRegion } from '../../models/aws-region.model';

import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError } from 'rxjs/operators';


@Injectable()
export class AwsRegionsEffects {

  constructor(
    private actions$: Actions,
    private awsRegionService: fromServices.AwsRegionsService
  ) {}

  @Effect() // in this case we only care about the action not the payload
  loadAwsRegions$ = this.actions$.ofType(awsRegionsActions.LOAD_AWS_REGIONS)
  .pipe( switchMap(() => {
      return this.awsRegionService.getAwsRegions().pipe(
          map(regions => new awsRegionsActions.LoadAwsRegionsSuccess(regions)),
          catchError(error => of(new awsRegionsActions.LoadAwsRegionsFail(error)))
      );
  })
  );

  @Effect() // in this case we want to see the PAYLOAD
  createAwsRegion$ = this.actions$
   .ofType(awsRegionsActions.CREATE_AWS_REGION)
   .pipe(
     map((action: awsRegionsActions.CreateAwsRegion) => action.payload),
     switchMap(region => {
        return this.awsRegionService.createAwsRegion(region)
        .pipe(
               map(newRegion => new awsRegionsActions.CreateAwsRegionSuccess(newRegion)),
               catchError(error => of(new awsRegionsActions.CreateAwsRegionFail(error)))
        );
     })
   );



}
