import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

import * as fromRoot from '../../../app/store';
import * as awsInstanceTypesActions from '../actions/aws-instance-type.actions';
import * as fromServices from '../../services';
import { AwsInstanceType } from '../../models/aws-instance-type.model';

import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError } from 'rxjs/operators';


@Injectable()
export class AwsInstanceTypesEffects {

  constructor(
    private actions$: Actions,
    private awsInstanceTypeService: fromServices.AwsInstanceTypesService
  ) {}

  @Effect() // in this case we only care about the action not the payload
  loadAwsInstanceTypes$ = this.actions$.ofType(awsInstanceTypesActions.LOAD_AWS_INSTANCE_TYPES)
  .pipe( switchMap(() => {
      return this.awsInstanceTypeService.getAwsInstanceTypes().pipe(
          map(instance_types => new awsInstanceTypesActions.LoadAwsInstanceTypesSuccess(instance_types)),
          catchError(error => of(new awsInstanceTypesActions.LoadAwsInstanceTypesFail(error)))
      );
  })
  );

  @Effect() // in this case we want to see the PAYLOAD
  createAwsInstanceType$ = this.actions$
   .ofType(awsInstanceTypesActions.CREATE_AWS_INSTANCE_TYPE)
   .pipe(
     map((action: awsInstanceTypesActions.CreateAwsInstanceType) => action.payload),
     switchMap(instance_type => {
        return this.awsInstanceTypeService.createAwsInstanceType(instance_type)
        .pipe(
               map(newInstanceType => new awsInstanceTypesActions.CreateAwsInstanceTypeSuccess(newInstanceType)),
               catchError(error => of(new awsInstanceTypesActions.CreateAwsInstanceTypeFail(error)))
        );
     })
   );

   @Effect()
   updateAwsInstanceType$ = this.actions$
    .ofType(awsInstanceTypesActions.UPDATE_AWS_INSTANCE_TYPE)
    .pipe(
      map((action: awsInstanceTypesActions.UpdateAwsInstanceType) => action.payload),
      switchMap(instance_type => {
          return this.awsInstanceTypeService.updateAwsInstanceType(instance_type)
          .pipe(
              map(instance_type_response => new awsInstanceTypesActions.UpdateAwsInstanceTypeSuccess(instance_type_response)),
              catchError(error => of(new awsInstanceTypesActions.UpdateAwsInstanceTypeFail(error)))
          );
      })
    );

    @Effect()
    removeAwsInstanceType$ = this.actions$
    .ofType(awsInstanceTypesActions.REMOVE_AWS_INSTANCE_TYPE)
    .pipe(
      map((action: awsInstanceTypesActions.RemoveAwsInstanceType) => action.payload),
      switchMap((instance_type) => {
          return this.awsInstanceTypeService
           .removeAwsInstanceType(instance_type)
           .pipe(
              map(() => new awsInstanceTypesActions.RemoveAwsInstanceTypeSuccess(instance_type)),
              catchError(error => of(new awsInstanceTypesActions.RemoveAwsInstanceTypeFail(error)))
           );
      })
    );


}
