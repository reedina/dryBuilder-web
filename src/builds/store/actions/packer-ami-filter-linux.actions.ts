import { Action } from '@ngrx/store';
import { AmiFilterLinux } from '../../models/packer-ami-filter-linux.model';


// LOAD AWS INSTANCE_TYPES - Action Constants
export const LOAD_AMI_FILTER_LINUXES = '[Builds] Load AMI Filter Linuxes';
export const LOAD_AMI_FILTER_LINUXES_FAIL = '[Builds] Load AMI Filter Linuxes Fail';
export const LOAD_AMI_FILTER_LINUXES_SUCCESS = '[Builds] Load AMI Filter Linuxes Success';

// Action Creators
export class LoadAmiFilterLinuxes implements Action {
   readonly type = LOAD_AMI_FILTER_LINUXES;
}
export class LoadAmiFilterLinuxesFail implements Action {
  readonly type = LOAD_AMI_FILTER_LINUXES_FAIL;
  constructor(public payload: any) {}
}
export class LoadAmiFilterLinuxesSuccess implements Action {
  readonly type = LOAD_AMI_FILTER_LINUXES_SUCCESS;
  constructor(public payload: AmiFilterLinux[]) {}
}

// CREATE AWS INSTANCE_TYPE
export const CREATE_AMI_FILTER_LINUX = '[Builds] Create AMI Filter Linux';
export const CREATE_AMI_FILTER_LINUX_SUCCESS = '[Builds] Create AMI Filter Linux Success';
export const CREATE_AMI_FILTER_LINUX_FAIL = '[Builds] Create AMI Filter Linux Fail';

export class CreateAmiFilterLinux implements Action {
  readonly type = CREATE_AMI_FILTER_LINUX;
 constructor(public payload: AmiFilterLinux) {}
}

export class CreateAmiFilterLinuxFail implements Action  {
  readonly type = CREATE_AMI_FILTER_LINUX_FAIL;
  constructor(public payload: any) {}
}

export class CreateAmiFilterLinuxSuccess implements Action {
   readonly type = CREATE_AMI_FILTER_LINUX_SUCCESS;
  constructor(public payload: AmiFilterLinux) {}
}

// UPDATE AWS INSTANCE_TYPE
export const UPDATE_AMI_FILTER_LINUX = '[Builds] Update AMI Filter Linux';
export const UPDATE_AMI_FILTER_LINUX_FAIL = '[Builds] Update AMI Filter Linux Fail';
export const UPDATE_AMI_FILTER_LINUX_SUCCESS = '[Builds] Update AMI Filter Linux Success';

export class UpdateAmiFilterLinux implements Action {
readonly type = UPDATE_AMI_FILTER_LINUX;
constructor(public payload: AmiFilterLinux) {}
}

export class UpdateAmiFilterLinuxFail implements Action {
    readonly type = UPDATE_AMI_FILTER_LINUX_FAIL;
    constructor(public payload: any) {}
}

export class UpdateAmiFilterLinuxSuccess implements Action {
    readonly type = UPDATE_AMI_FILTER_LINUX_SUCCESS;
    constructor(public payload: AmiFilterLinux) {}
}

// REMOVE AMI_FILTER_LINUX
export const REMOVE_AMI_FILTER_LINUX = '[Builds] Remove AMI Filter Linux';
export const REMOVE_AMI_FILTER_LINUX_FAIL = '[Builds] Remove AMI Filter Linux Fail';
export const REMOVE_AMI_FILTER_LINUX_SUCCESS = '[Builds] Remove AMI Filter Linux Success';

export class RemoveAmiFilterLinux implements Action {
readonly type = REMOVE_AMI_FILTER_LINUX;
 constructor(public payload: AmiFilterLinux) {}
}

export class RemoveAmiFilterLinuxFail implements Action {
   readonly type = REMOVE_AMI_FILTER_LINUX_FAIL;
    constructor(public payload: any) { }
}

export class RemoveAmiFilterLinuxSuccess implements Action {

  readonly type = REMOVE_AMI_FILTER_LINUX_SUCCESS;
  constructor(public payload: AmiFilterLinux) {}
}

// ACTION TYPES
export type AmiFilterLinuxesActions =
 | LoadAmiFilterLinuxes
 | LoadAmiFilterLinuxesFail
 | LoadAmiFilterLinuxesSuccess
 | CreateAmiFilterLinux
 | CreateAmiFilterLinuxSuccess
 | CreateAmiFilterLinuxFail
 | UpdateAmiFilterLinux
 | UpdateAmiFilterLinuxFail
 | UpdateAmiFilterLinuxSuccess
 | RemoveAmiFilterLinux
 | RemoveAmiFilterLinuxFail
 | RemoveAmiFilterLinuxSuccess;
