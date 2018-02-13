import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

import * as fromRoot from '../../../app/store';
import * as awsAuthsActions from '../actions/aws-auth.actions';
import * as fromServices from '../../services';
import { AwsAuth } from '../../models/aws-auth.model';

import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError } from 'rxjs/operators';


@Injectable()
export class AwsAuthsEffects {

  constructor(
    private actions$: Actions,
    private awsAuthService: fromServices.AwsAuthsService
  ) {}

  @Effect() // in this case we only care about the action not the payload
  loadAwsAuths$ = this.actions$.ofType(awsAuthsActions.LOAD_AWS_AUTHS)
  .pipe( switchMap(() => {
      return this.awsAuthService.getAwsAuths().pipe(
          map(auths => new awsAuthsActions.LoadAwsAuthsSuccess(auths)),
          catchError(error => of(new awsAuthsActions.LoadAwsAuthsFail(error)))
      );
  })
  );

  @Effect() // in this case we want to see the PAYLOAD
  createAwsAuth$ = this.actions$
   .ofType(awsAuthsActions.CREATE_AWS_AUTH)
   .pipe(
     map((action: awsAuthsActions.CreateAwsAuth) => action.payload),
     switchMap(auth => {
        return this.awsAuthService.createAwsAuth(auth)
        .pipe(
               map(newAuth => new awsAuthsActions.CreateAwsAuthSuccess(newAuth)),
               catchError(error => of(new awsAuthsActions.CreateAwsAuthFail(error)))
        );
     })
   );

   @Effect()
   updateAwsAuth$ = this.actions$
    .ofType(awsAuthsActions.UPDATE_AWS_AUTH)
    .pipe(
      map((action: awsAuthsActions.UpdateAwsAuth) => action.payload),
      switchMap(auth => {
          return this.awsAuthService.updateAwsAuth(auth)
          .pipe(
              map(auth_response => new awsAuthsActions.UpdateAwsAuthSuccess(auth_response)),
              catchError(error => of(new awsAuthsActions.UpdateAwsAuthFail(error)))
          );
      })
    );

    @Effect()
    removeAwsAuth$ = this.actions$
    .ofType(awsAuthsActions.REMOVE_AWS_AUTH)
    .pipe(
      map((action: awsAuthsActions.RemoveAwsAuth) => action.payload),
      switchMap((auth) => {
          return this.awsAuthService
           .removeAwsAuth(auth)
           .pipe(
              map(() => new awsAuthsActions.RemoveAwsAuthSuccess(auth)),
              catchError(error => of(new awsAuthsActions.RemoveAwsAuthFail(error)))
           );
      })
    );


}
