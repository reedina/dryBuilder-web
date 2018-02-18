import { Action } from '@ngrx/store';
import { EbsBuilder } from '../../models/ebs-builder.model';


// LOAD AWS AUTHS - Action Constants
export const LOAD_EBS_BUILDERS = '[Builds] Load EBS Builders';
export const LOAD_EBS_BUILDERS_FAIL = '[Builds] Load EBS Builders Fail';
export const LOAD_EBS_BUILDERS_SUCCESS = '[Builds] Load EBS Builders Success';

// Action Creators
export class LoadEbsBuilders implements Action {
   readonly type = LOAD_EBS_BUILDERS;
}
export class LoadEbsBuildersFail implements Action {
  readonly type = LOAD_EBS_BUILDERS_FAIL;
  constructor(public payload: any) {}
}
export class LoadEbsBuildersSuccess implements Action {
  readonly type = LOAD_EBS_BUILDERS_SUCCESS;
  constructor(public payload: EbsBuilder[]) {}
}

// CREATE AWS AUTH
export const CREATE_EBS_BUILDER = '[Builds] Create EBS Builder';
export const CREATE_EBS_BUILDER_SUCCESS = '[Builds] Create EBS Builder Success';
export const CREATE_EBS_BUILDER_FAIL = '[Builds] Create EBS Builder Fail';

export class CreateEbsBuilder implements Action {
  readonly type = CREATE_EBS_BUILDER;
 constructor(public payload: EbsBuilder) {}
}

export class CreateEbsBuilderFail implements Action  {
  readonly type = CREATE_EBS_BUILDER_FAIL;
  constructor(public payload: any) {}
}

export class CreateEbsBuilderSuccess implements Action {
   readonly type = CREATE_EBS_BUILDER_SUCCESS;
  constructor(public payload: EbsBuilder) {}
}

// UPDATE AWS AUTH
export const UPDATE_EBS_BUILDER = '[Builds] Update EBS Builder';
export const UPDATE_EBS_BUILDER_FAIL = '[Builds] Update EBS Builder Fail';
export const UPDATE_EBS_BUILDER_SUCCESS = '[Builds] Update EBS Builder Success';

export class UpdateEbsBuilder implements Action {
readonly type = UPDATE_EBS_BUILDER;
constructor(public payload: EbsBuilder) {}
}

export class UpdateEbsBuilderFail implements Action {
    readonly type = UPDATE_EBS_BUILDER_FAIL;
    constructor(public payload: any) {}
}

export class UpdateEbsBuilderSuccess implements Action {
    readonly type = UPDATE_EBS_BUILDER_SUCCESS;
    constructor(public payload: EbsBuilder) {}
}

// REMOVE EBS_BUILDER
export const REMOVE_EBS_BUILDER = '[Builds] Remove EBS Builder';
export const REMOVE_EBS_BUILDER_FAIL = '[Builds] Remove EBS Builder Fail';
export const REMOVE_EBS_BUILDER_SUCCESS = '[Builds] Remove EBS Builder Success';

export class RemoveEbsBuilder implements Action {
readonly type = REMOVE_EBS_BUILDER;
 constructor(public payload: EbsBuilder) {}
}

export class RemoveEbsBuilderFail implements Action {
   readonly type = REMOVE_EBS_BUILDER_FAIL;
    constructor(public payload: any) { }
}

export class RemoveEbsBuilderSuccess implements Action {

  readonly type = REMOVE_EBS_BUILDER_SUCCESS;
  constructor(public payload: EbsBuilder) {}
}

// ACTION TYPES
export type EbsBuildersActions =
 | LoadEbsBuilders
 | LoadEbsBuildersFail
 | LoadEbsBuildersSuccess
 | CreateEbsBuilder
 | CreateEbsBuilderSuccess
 | CreateEbsBuilderFail
 | UpdateEbsBuilder
 | UpdateEbsBuilderFail
 | UpdateEbsBuilderSuccess
 | RemoveEbsBuilder
 | RemoveEbsBuilderFail
 | RemoveEbsBuilderSuccess;
