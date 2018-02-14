import { Action } from '@ngrx/store';
import { PackerBuilderType } from '../../models/packer-builder-type.model';


// LOAD AWS INSTANCE_TYPES - Action Constants
export const LOAD_PACKER_BUILDER_TYPES = '[Builds] Load Packer Builder Types';
export const LOAD_PACKER_BUILDER_TYPES_FAIL = '[Builds] Load Packer Builder Types Fail';
export const LOAD_PACKER_BUILDER_TYPES_SUCCESS = '[Builds] Load Packer Builder Types Success';

// Action Creators
export class LoadPackerBuilderTypes implements Action {
   readonly type = LOAD_PACKER_BUILDER_TYPES;
}
export class LoadPackerBuilderTypesFail implements Action {
  readonly type = LOAD_PACKER_BUILDER_TYPES_FAIL;
  constructor(public payload: any) {}
}
export class LoadPackerBuilderTypesSuccess implements Action {
  readonly type = LOAD_PACKER_BUILDER_TYPES_SUCCESS;
  constructor(public payload: PackerBuilderType[]) {}
}

// CREATE AWS INSTANCE_TYPE
export const CREATE_PACKER_BUILDER_TYPE = '[Builds] Create Packer Builder Type';
export const CREATE_PACKER_BUILDER_TYPE_SUCCESS = '[Builds] Create Packer Builder Type Success';
export const CREATE_PACKER_BUILDER_TYPE_FAIL = '[Builds] Create Packer Builder Type Fail';

export class CreatePackerBuilderType implements Action {
  readonly type = CREATE_PACKER_BUILDER_TYPE;
 constructor(public payload: PackerBuilderType) {}
}

export class CreatePackerBuilderTypeFail implements Action  {
  readonly type = CREATE_PACKER_BUILDER_TYPE_FAIL;
  constructor(public payload: any) {}
}

export class CreatePackerBuilderTypeSuccess implements Action {
   readonly type = CREATE_PACKER_BUILDER_TYPE_SUCCESS;
  constructor(public payload: PackerBuilderType) {}
}

// UPDATE AWS INSTANCE_TYPE
export const UPDATE_PACKER_BUILDER_TYPE = '[Builds] Update Packer Builder Type';
export const UPDATE_PACKER_BUILDER_TYPE_FAIL = '[Builds] Update Packer Builder Type Fail';
export const UPDATE_PACKER_BUILDER_TYPE_SUCCESS = '[Builds] Update Packer Builder Type Success';

export class UpdatePackerBuilderType implements Action {
readonly type = UPDATE_PACKER_BUILDER_TYPE;
constructor(public payload: PackerBuilderType) {}
}

export class UpdatePackerBuilderTypeFail implements Action {
    readonly type = UPDATE_PACKER_BUILDER_TYPE_FAIL;
    constructor(public payload: any) {}
}

export class UpdatePackerBuilderTypeSuccess implements Action {
    readonly type = UPDATE_PACKER_BUILDER_TYPE_SUCCESS;
    constructor(public payload: PackerBuilderType) {}
}

// REMOVE PACKER_BUILDER_TYPE
export const REMOVE_PACKER_BUILDER_TYPE = '[Builds] Remove Packer Builder Type';
export const REMOVE_PACKER_BUILDER_TYPE_FAIL = '[Builds] Remove Packer Builder Type Fail';
export const REMOVE_PACKER_BUILDER_TYPE_SUCCESS = '[Builds] Remove Packer Builder Type Success';

export class RemovePackerBuilderType implements Action {
readonly type = REMOVE_PACKER_BUILDER_TYPE;
 constructor(public payload: PackerBuilderType) {}
}

export class RemovePackerBuilderTypeFail implements Action {
   readonly type = REMOVE_PACKER_BUILDER_TYPE_FAIL;
    constructor(public payload: any) { }
}

export class RemovePackerBuilderTypeSuccess implements Action {

  readonly type = REMOVE_PACKER_BUILDER_TYPE_SUCCESS;
  constructor(public payload: PackerBuilderType) {}
}

// ACTION TYPES
export type PackerBuilderTypesActions =
 | LoadPackerBuilderTypes
 | LoadPackerBuilderTypesFail
 | LoadPackerBuilderTypesSuccess
 | CreatePackerBuilderType
 | CreatePackerBuilderTypeSuccess
 | CreatePackerBuilderTypeFail
 | UpdatePackerBuilderType
 | UpdatePackerBuilderTypeFail
 | UpdatePackerBuilderTypeSuccess
 | RemovePackerBuilderType
 | RemovePackerBuilderTypeFail
 | RemovePackerBuilderTypeSuccess;
