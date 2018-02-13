import { Action } from '@ngrx/store';
import { AwsInstanceType } from '../../models/aws-instance-type.model';


// LOAD AWS INSTANCE_TYPES - Action Constants
export const LOAD_AWS_INSTANCE_TYPES = '[Builds] Load AWS Instance Types';
export const LOAD_AWS_INSTANCE_TYPES_FAIL = '[Builds] Load AWS Instance Types Fail';
export const LOAD_AWS_INSTANCE_TYPES_SUCCESS = '[Builds] Load AWS Instance Types Success';

// Action Creators
export class LoadAwsInstanceTypes implements Action {
   readonly type = LOAD_AWS_INSTANCE_TYPES;
}
export class LoadAwsInstanceTypesFail implements Action {
  readonly type = LOAD_AWS_INSTANCE_TYPES_FAIL;
  constructor(public payload: any) {}
}
export class LoadAwsInstanceTypesSuccess implements Action {
  readonly type = LOAD_AWS_INSTANCE_TYPES_SUCCESS;
  constructor(public payload: AwsInstanceType[]) {}
}

// CREATE AWS INSTANCE_TYPE
export const CREATE_AWS_INSTANCE_TYPE = '[Builds] Create AWS Instance Type';
export const CREATE_AWS_INSTANCE_TYPE_SUCCESS = '[Builds] Create AWS Instance Type Success';
export const CREATE_AWS_INSTANCE_TYPE_FAIL = '[Builds] Create AWS Instance Type Fail';

export class CreateAwsInstanceType implements Action {
  readonly type = CREATE_AWS_INSTANCE_TYPE;
 constructor(public payload: AwsInstanceType) {}
}

export class CreateAwsInstanceTypeFail implements Action  {
  readonly type = CREATE_AWS_INSTANCE_TYPE_FAIL;
  constructor(public payload: any) {}
}

export class CreateAwsInstanceTypeSuccess implements Action {
   readonly type = CREATE_AWS_INSTANCE_TYPE_SUCCESS;
  constructor(public payload: AwsInstanceType) {}
}

// UPDATE AWS INSTANCE_TYPE
export const UPDATE_AWS_INSTANCE_TYPE = '[Builds] Update AWS Instance Type';
export const UPDATE_AWS_INSTANCE_TYPE_FAIL = '[Builds] Update AWS Instance Type Fail';
export const UPDATE_AWS_INSTANCE_TYPE_SUCCESS = '[Builds] Update AWS Instance Type Success';

export class UpdateAwsInstanceType implements Action {
readonly type = UPDATE_AWS_INSTANCE_TYPE;
constructor(public payload: AwsInstanceType) {}
}

export class UpdateAwsInstanceTypeFail implements Action {
    readonly type = UPDATE_AWS_INSTANCE_TYPE_FAIL;
    constructor(public payload: any) {}
}

export class UpdateAwsInstanceTypeSuccess implements Action {
    readonly type = UPDATE_AWS_INSTANCE_TYPE_SUCCESS;
    constructor(public payload: AwsInstanceType) {}
}

// REMOVE AWS_INSTANCE_TYPE
export const REMOVE_AWS_INSTANCE_TYPE = '[Builds] Remove AWS Instance Type';
export const REMOVE_AWS_INSTANCE_TYPE_FAIL = '[Builds] Remove AWS Instance Type Fail';
export const REMOVE_AWS_INSTANCE_TYPE_SUCCESS = '[Builds] Remove AWS Instance Type Success';

export class RemoveAwsInstanceType implements Action {
readonly type = REMOVE_AWS_INSTANCE_TYPE;
 constructor(public payload: AwsInstanceType) {}
}

export class RemoveAwsInstanceTypeFail implements Action {
   readonly type = REMOVE_AWS_INSTANCE_TYPE_FAIL;
    constructor(public payload: any) { }
}

export class RemoveAwsInstanceTypeSuccess implements Action {

  readonly type = REMOVE_AWS_INSTANCE_TYPE_SUCCESS;
  constructor(public payload: AwsInstanceType) {}
}

// ACTION TYPES
export type AwsInstanceTypesActions =
 | LoadAwsInstanceTypes
 | LoadAwsInstanceTypesFail
 | LoadAwsInstanceTypesSuccess
 | CreateAwsInstanceType
 | CreateAwsInstanceTypeSuccess
 | CreateAwsInstanceTypeFail
 | UpdateAwsInstanceType
 | UpdateAwsInstanceTypeFail
 | UpdateAwsInstanceTypeSuccess
 | RemoveAwsInstanceType
 | RemoveAwsInstanceTypeFail
 | RemoveAwsInstanceTypeSuccess;
