import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

import * as fromRoot from '../../../app/store';
import * as packerBuilderTypesActions from '../actions/packer-builder-type.actions';
import * as fromServices from '../../services';
import { PackerBuilderType } from '../../models/packer-builder-type.model';

import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError } from 'rxjs/operators';


@Injectable()
export class PackerBuilderTypesEffects {

  constructor(
    private actions$: Actions,
    private packerBuilderTypeService: fromServices.PackerBuilderTypesService
  ) {}

  @Effect() // in this case we only care about the action not the payload
  loadPackerBuilderTypes$ = this.actions$.ofType(packerBuilderTypesActions.LOAD_PACKER_BUILDER_TYPES)
  .pipe( switchMap(() => {
      return this.packerBuilderTypeService.getPackerBuilderTypes().pipe(
          map(packer_builder_types => new packerBuilderTypesActions.LoadPackerBuilderTypesSuccess(packer_builder_types)),
          catchError(error => of(new packerBuilderTypesActions.LoadPackerBuilderTypesFail(error)))
      );
  })
  );

  @Effect() // in this case we want to see the PAYLOAD
  createPackerBuilderType$ = this.actions$
   .ofType(packerBuilderTypesActions.CREATE_PACKER_BUILDER_TYPE)
   .pipe(
     map((action: packerBuilderTypesActions.CreatePackerBuilderType) => action.payload),
     switchMap(packer_builder_type => {
        return this.packerBuilderTypeService.createPackerBuilderType(packer_builder_type)
        .pipe(
               map(newInstanceType => new packerBuilderTypesActions.CreatePackerBuilderTypeSuccess(newInstanceType)),
               catchError(error => of(new packerBuilderTypesActions.CreatePackerBuilderTypeFail(error)))
        );
     })
   );

   @Effect()
   updatePackerBuilderType$ = this.actions$
    .ofType(packerBuilderTypesActions.UPDATE_PACKER_BUILDER_TYPE)
    .pipe(
      map((action: packerBuilderTypesActions.UpdatePackerBuilderType) => action.payload),
      switchMap(packer_builder_type => {
          return this.packerBuilderTypeService.updatePackerBuilderType(packer_builder_type)
          .pipe(
              map(packer_builder_type_response =>
                new packerBuilderTypesActions.UpdatePackerBuilderTypeSuccess(packer_builder_type_response)),
              catchError(error => of(new packerBuilderTypesActions.UpdatePackerBuilderTypeFail(error)))
          );
      })
    );

    @Effect()
    removePackerBuilderType$ = this.actions$
    .ofType(packerBuilderTypesActions.REMOVE_PACKER_BUILDER_TYPE)
    .pipe(
      map((action: packerBuilderTypesActions.RemovePackerBuilderType) => action.payload),
      switchMap((packer_builder_type) => {
          return this.packerBuilderTypeService
           .removePackerBuilderType(packer_builder_type)
           .pipe(
              map(() => new packerBuilderTypesActions.RemovePackerBuilderTypeSuccess(packer_builder_type)),
              catchError(error => of(new packerBuilderTypesActions.RemovePackerBuilderTypeFail(error)))
           );
      })
    );


}
