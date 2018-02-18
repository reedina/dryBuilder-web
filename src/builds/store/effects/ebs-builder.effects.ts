import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

import * as fromRoot from '../../../app/store';
import * as ebsBuildersActions from '../actions/ebs-builder.actions';
import * as fromServices from '../../services';
import { EbsBuilder } from '../../models/ebs-builder.model';

import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError } from 'rxjs/operators';


@Injectable()
export class EbsBuildersEffects {

  constructor(
    private actions$: Actions,
    private ebsBuilderService: fromServices.EbsBuildersService
  ) {}

  @Effect() // in this case we only care about the action not the payload
  loadEbsBuilders$ = this.actions$.ofType(ebsBuildersActions.LOAD_EBS_BUILDERS)
  .pipe( switchMap(() => {
      return this.ebsBuilderService.getEbsBuilders().pipe(
          map(auths => new ebsBuildersActions.LoadEbsBuildersSuccess(auths)),
          catchError(error => of(new ebsBuildersActions.LoadEbsBuildersFail(error)))
      );
  })
  );

  @Effect() // in this case we want to see the PAYLOAD
  createEbsBuilder$ = this.actions$
   .ofType(ebsBuildersActions.CREATE_EBS_BUILDER)
   .pipe(
     map((action: ebsBuildersActions.CreateEbsBuilder) => action.payload),
     switchMap(auth => {
        return this.ebsBuilderService.createEbsBuilder(auth)
        .pipe(
               map(newAuth => new ebsBuildersActions.CreateEbsBuilderSuccess(newAuth)),
               catchError(error => of(new ebsBuildersActions.CreateEbsBuilderFail(error)))
        );
     })
   );

   @Effect()
   updateEbsBuilder$ = this.actions$
    .ofType(ebsBuildersActions.UPDATE_EBS_BUILDER)
    .pipe(
      map((action: ebsBuildersActions.UpdateEbsBuilder) => action.payload),
      switchMap(auth => {
          return this.ebsBuilderService.updateEbsBuilder(auth)
          .pipe(
              map(auth_response => new ebsBuildersActions.UpdateEbsBuilderSuccess(auth_response)),
              catchError(error => of(new ebsBuildersActions.UpdateEbsBuilderFail(error)))
          );
      })
    );

    @Effect()
    removeEbsBuilder$ = this.actions$
    .ofType(ebsBuildersActions.REMOVE_EBS_BUILDER)
    .pipe(
      map((action: ebsBuildersActions.RemoveEbsBuilder) => action.payload),
      switchMap((auth) => {
          return this.ebsBuilderService
           .removeEbsBuilder(auth)
           .pipe(
              map(() => new ebsBuildersActions.RemoveEbsBuilderSuccess(auth)),
              catchError(error => of(new ebsBuildersActions.RemoveEbsBuilderFail(error)))
           );
      })
    );


}
