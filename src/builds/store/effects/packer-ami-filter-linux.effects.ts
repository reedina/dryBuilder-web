import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

import * as fromRoot from '../../../app/store';
import * as amiFilterLinuxesActions from '../actions/packer-ami-filter-linux.actions';
import * as fromServices from '../../services';
import { AmiFilterLinux } from '../../models/packer-ami-filter-linux.model';

import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError } from 'rxjs/operators';


@Injectable()
export class AmiFilterLinuxesEffects {

  constructor(
    private actions$: Actions,
    private awsfilterLinuxService: fromServices.AmiFilterLinuxesService
  ) {}

  @Effect() // in this case we only care about the action not the payload
  loadAmiFilterLinuxes$ = this.actions$.ofType(amiFilterLinuxesActions.LOAD_AMI_FILTER_LINUXES)
  .pipe( switchMap(() => {
      return this.awsfilterLinuxService.getAmiFilterLinuxes().pipe(
          map(ami_filter_linuxes => new amiFilterLinuxesActions.LoadAmiFilterLinuxesSuccess(ami_filter_linuxes)),
          catchError(error => of(new amiFilterLinuxesActions.LoadAmiFilterLinuxesFail(error)))
      );
  })
  );

  @Effect() // in this case we want to see the PAYLOAD
  createAmiFilterLinux$ = this.actions$
   .ofType(amiFilterLinuxesActions.CREATE_AMI_FILTER_LINUX)
   .pipe(
     map((action: amiFilterLinuxesActions.CreateAmiFilterLinux) => action.payload),
     switchMap(ami_filter_linux => {
        return this.awsfilterLinuxService.createAmiFilterLinux(ami_filter_linux)
        .pipe(
               map(newfilterLinux => new amiFilterLinuxesActions.CreateAmiFilterLinuxSuccess(newfilterLinux)),
               catchError(error => of(new amiFilterLinuxesActions.CreateAmiFilterLinuxFail(error)))
        );
     })
   );

   @Effect()
   updateAmiFilterLinux$ = this.actions$
    .ofType(amiFilterLinuxesActions.UPDATE_AMI_FILTER_LINUX)
    .pipe(
      map((action: amiFilterLinuxesActions.UpdateAmiFilterLinux) => action.payload),
      switchMap(ami_filter_linux => {
          return this.awsfilterLinuxService.updateAmiFilterLinux(ami_filter_linux)
          .pipe(
              map(ami_filter_linux_response => new amiFilterLinuxesActions.UpdateAmiFilterLinuxSuccess(ami_filter_linux_response)),
              catchError(error => of(new amiFilterLinuxesActions.UpdateAmiFilterLinuxFail(error)))
          );
      })
    );

    @Effect()
    removeAmiFilterLinux$ = this.actions$
    .ofType(amiFilterLinuxesActions.REMOVE_AMI_FILTER_LINUX)
    .pipe(
      map((action: amiFilterLinuxesActions.RemoveAmiFilterLinux) => action.payload),
      switchMap((ami_filter_linux) => {
          return this.awsfilterLinuxService
           .removeAmiFilterLinux(ami_filter_linux)
           .pipe(
              map(() => new amiFilterLinuxesActions.RemoveAmiFilterLinuxSuccess(ami_filter_linux)),
              catchError(error => of(new amiFilterLinuxesActions.RemoveAmiFilterLinuxFail(error)))
           );
      })
    );


}
