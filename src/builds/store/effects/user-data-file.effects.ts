import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

import * as fromRoot from '../../../app/store';
import * as userDataFilesActions from '../actions/user-data-file.actions';
import * as fromServices from '../../services';
import { UserDataFile } from '../../models/user-data-file.model';

import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError } from 'rxjs/operators';


@Injectable()
export class UserDataFilesEffects {

  constructor(
    private actions$: Actions,
    private userDataFileService: fromServices.UserDataFilesService
  ) {}

  @Effect() // in this case we only care about the action not the payload
  loadUserDataFiles$ = this.actions$.ofType(userDataFilesActions.LOAD_USER_DATA_FILES)
  .pipe( switchMap(() => {
      return this.userDataFileService.getUserDataFiles().pipe(
          map(user_data_files => new userDataFilesActions.LoadUserDataFilesSuccess(user_data_files)),
          catchError(error => of(new userDataFilesActions.LoadUserDataFilesFail(error)))
      );
  })
  );

  @Effect() // in this case we want to see the PAYLOAD
  createUserDataFile$ = this.actions$
   .ofType(userDataFilesActions.CREATE_USER_DATA_FILE)
   .pipe(
     map((action: userDataFilesActions.CreateUserDataFile) => action.payload),
     switchMap(user_data_file => {
        return this.userDataFileService.createUserDataFile(user_data_file)
        .pipe(
               map(newUserDataFile => new userDataFilesActions.CreateUserDataFileSuccess(newUserDataFile)),
               catchError(error => of(new userDataFilesActions.CreateUserDataFileFail(error)))
        );
     })
   );

   @Effect()
   updateUserDataFile$ = this.actions$
    .ofType(userDataFilesActions.UPDATE_USER_DATA_FILE)
    .pipe(
      map((action: userDataFilesActions.UpdateUserDataFile) => action.payload),
      switchMap(user_data_file => {
          return this.userDataFileService.updateUserDataFile(user_data_file)
          .pipe(
              map(user_data_file_response => new userDataFilesActions.UpdateUserDataFileSuccess(user_data_file_response)),
              catchError(error => of(new userDataFilesActions.UpdateUserDataFileFail(error)))
          );
      })
    );

    @Effect()
    removeUserDataFile$ = this.actions$
    .ofType(userDataFilesActions.REMOVE_USER_DATA_FILE)
    .pipe(
      map((action: userDataFilesActions.RemoveUserDataFile) => action.payload),
      switchMap((user_data_file) => {
          return this.userDataFileService
           .removeUserDataFile(user_data_file)
           .pipe(
              map(() => new userDataFilesActions.RemoveUserDataFileSuccess(user_data_file)),
              catchError(error => of(new userDataFilesActions.RemoveUserDataFileFail(error)))
           );
      })
    );


}
