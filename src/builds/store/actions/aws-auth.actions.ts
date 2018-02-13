import { Action } from '@ngrx/store';
import { AwsAuth } from '../../models/aws-auth.model';


// LOAD AWS AUTHS - Action Constants
export const LOAD_AWS_AUTHS = '[Builds] Load AWS Auths';
export const LOAD_AWS_AUTHS_FAIL = '[Builds] Load AWS Auths Fail';
export const LOAD_AWS_AUTHS_SUCCESS = '[Builds] Load AWS Auths Success';

// Action Creators
export class LoadAwsAuths implements Action {
   readonly type = LOAD_AWS_AUTHS;
}
export class LoadAwsAuthsFail implements Action {
  readonly type = LOAD_AWS_AUTHS_FAIL;
  constructor(public payload: any) {}
}
export class LoadAwsAuthsSuccess implements Action {
  readonly type = LOAD_AWS_AUTHS_SUCCESS;
  constructor(public payload: AwsAuth[]) {}
}

// CREATE AWS AUTH
export const CREATE_AWS_AUTH = '[Builds] Create AWS Auth';
export const CREATE_AWS_AUTH_SUCCESS = '[Builds] Create AWS Auth Success';
export const CREATE_AWS_AUTH_FAIL = '[Builds] Create AWS Auth Fail';

export class CreateAwsAuth implements Action {
  readonly type = CREATE_AWS_AUTH;
 constructor(public payload: AwsAuth) {}
}

export class CreateAwsAuthFail implements Action  {
  readonly type = CREATE_AWS_AUTH_FAIL;
  constructor(public payload: any) {}
}

export class CreateAwsAuthSuccess implements Action {
   readonly type = CREATE_AWS_AUTH_SUCCESS;
  constructor(public payload: AwsAuth) {}
}

// UPDATE AWS AUTH
export const UPDATE_AWS_AUTH = '[Builds] Update AWS Auth';
export const UPDATE_AWS_AUTH_FAIL = '[Builds] Update AWS Auth Fail';
export const UPDATE_AWS_AUTH_SUCCESS = '[Builds] Update AWS Auth Success';

export class UpdateAwsAuth implements Action {
readonly type = UPDATE_AWS_AUTH;
constructor(public payload: AwsAuth) {}
}

export class UpdateAwsAuthFail implements Action {
    readonly type = UPDATE_AWS_AUTH_FAIL;
    constructor(public payload: any) {}
}

export class UpdateAwsAuthSuccess implements Action {
    readonly type = UPDATE_AWS_AUTH_SUCCESS;
    constructor(public payload: AwsAuth) {}
}

// REMOVE AWS_AUTH
export const REMOVE_AWS_AUTH = '[Builds] Remove AWS Auth';
export const REMOVE_AWS_AUTH_FAIL = '[Builds] Remove AWS Auth Fail';
export const REMOVE_AWS_AUTH_SUCCESS = '[Builds] Remove AWS Auth Success';

export class RemoveAwsAuth implements Action {
readonly type = REMOVE_AWS_AUTH;
 constructor(public payload: AwsAuth) {}
}

export class RemoveAwsAuthFail implements Action {
   readonly type = REMOVE_AWS_AUTH_FAIL;
    constructor(public payload: any) { }
}

export class RemoveAwsAuthSuccess implements Action {

  readonly type = REMOVE_AWS_AUTH_SUCCESS;
  constructor(public payload: AwsAuth) {}
}

// ACTION TYPES
export type AwsAuthsActions =
 | LoadAwsAuths
 | LoadAwsAuthsFail
 | LoadAwsAuthsSuccess
 | CreateAwsAuth
 | CreateAwsAuthSuccess
 | CreateAwsAuthFail
 | UpdateAwsAuth
 | UpdateAwsAuthFail
 | UpdateAwsAuthSuccess
 | RemoveAwsAuth
 | RemoveAwsAuthFail
 | RemoveAwsAuthSuccess;
