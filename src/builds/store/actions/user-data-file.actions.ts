import { Action } from '@ngrx/store';
import { UserDataFile } from '../../models/user-data-file.model';


// LOAD USER DATA FILES - Action Constants
export const LOAD_USER_DATA_FILES = '[Builds] Load User Data Files';
export const LOAD_USER_DATA_FILES_FAIL = '[Builds] User Data Files Fail';
export const LOAD_USER_DATA_FILES_SUCCESS = '[Builds] Load User Data Files Success';

// Action Creators
export class LoadUserDataFiles implements Action {
   readonly type = LOAD_USER_DATA_FILES;
}
export class LoadUserDataFilesFail implements Action {
  readonly type = LOAD_USER_DATA_FILES_FAIL;
  constructor(public payload: any) {}
}
export class LoadUserDataFilesSuccess implements Action {
  readonly type = LOAD_USER_DATA_FILES_SUCCESS;
  constructor(public payload: UserDataFile[]) {}
}

// CREATE USER DATA FILE
export const CREATE_USER_DATA_FILE = '[Builds] Create User Data File';
export const CREATE_USER_DATA_FILE_SUCCESS = '[Builds] Create User Data File Success';
export const CREATE_USER_DATA_FILE_FAIL = '[Builds] Create User Data File Fail';

export class CreateUserDataFile implements Action {
  readonly type = CREATE_USER_DATA_FILE;
 constructor(public payload: UserDataFile) {}
}

export class CreateUserDataFileFail implements Action  {
  readonly type = CREATE_USER_DATA_FILE_FAIL;
  constructor(public payload: any) {}
}

export class CreateUserDataFileSuccess implements Action {
   readonly type = CREATE_USER_DATA_FILE_SUCCESS;
  constructor(public payload: UserDataFile) {}
}

// UPDATE USER DATA FILE
export const UPDATE_USER_DATA_FILE = '[Builds] Update User Data File';
export const UPDATE_USER_DATA_FILE_FAIL = '[Builds] Update User Data File Fail';
export const UPDATE_USER_DATA_FILE_SUCCESS = '[Builds] Update User Data File Success';

export class UpdateUserDataFile implements Action {
readonly type = UPDATE_USER_DATA_FILE;
constructor(public payload: UserDataFile) {}
}

export class UpdateUserDataFileFail implements Action {
    readonly type = UPDATE_USER_DATA_FILE_FAIL;
    constructor(public payload: any) {}
}

export class UpdateUserDataFileSuccess implements Action {
    readonly type = UPDATE_USER_DATA_FILE_SUCCESS;
    constructor(public payload: UserDataFile) {}
}

// REMOVE USER_DATA_FILE
export const REMOVE_USER_DATA_FILE = '[Builds] Remove User Data File';
export const REMOVE_USER_DATA_FILE_FAIL = '[Builds] Remove User Data File Fail';
export const REMOVE_USER_DATA_FILE_SUCCESS = '[Builds] Remove User Data File Success';

export class RemoveUserDataFile implements Action {
readonly type = REMOVE_USER_DATA_FILE;
 constructor(public payload: UserDataFile) {}
}

export class RemoveUserDataFileFail implements Action {
   readonly type = REMOVE_USER_DATA_FILE_FAIL;
    constructor(public payload: any) { }
}

export class RemoveUserDataFileSuccess implements Action {

  readonly type = REMOVE_USER_DATA_FILE_SUCCESS;
  constructor(public payload: UserDataFile) {}
}

// ACTION TYPES
export type UserDataFilesActions =
 | LoadUserDataFiles
 | LoadUserDataFilesFail
 | LoadUserDataFilesSuccess
 | CreateUserDataFile
 | CreateUserDataFileSuccess
 | CreateUserDataFileFail
 | UpdateUserDataFile
 | UpdateUserDataFileFail
 | UpdateUserDataFileSuccess
 | RemoveUserDataFile
 | RemoveUserDataFileFail
 | RemoveUserDataFileSuccess;
