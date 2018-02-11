import { Action } from '@ngrx/store';
import { AwsRegion } from '../../models/aws-region.model';


// LOAD AWS REGIONS - Action Constants
export const LOAD_AWS_REGIONS = '[Builds] Load AWS Regions';
export const LOAD_AWS_REGIONS_FAIL = '[Builds] AWS Regions Fail';
export const LOAD_AWS_REGIONS_SUCCESS = '[Builds] Load AWS Regions Success';

// Action Creators
export class LoadAwsRegions implements Action {
   readonly type = LOAD_AWS_REGIONS;
}
export class LoadAwsRegionsFail implements Action {
  readonly type = LOAD_AWS_REGIONS_FAIL;
  constructor(public payload: any) {}
}
export class LoadAwsRegionsSuccess implements Action {
  readonly type = LOAD_AWS_REGIONS_SUCCESS;
  constructor(public payload: AwsRegion[]) {}
}

// CREATE AWS REGION
export const CREATE_AWS_REGION = '[Builds] Create AWS Region';
export const CREATE_AWS_REGION_SUCCESS = '[Builds] Create AWS Region Success';
export const CREATE_AWS_REGION_FAIL = '[Builds] Create AWS Region Fail';

export class CreateAwsRegion implements Action {
  readonly type = CREATE_AWS_REGION;
 constructor(public payload: AwsRegion) {}
}

export class CreateAwsRegionFail implements Action  {
  readonly type = CREATE_AWS_REGION_FAIL;
  constructor(public payload: any) {}
}

export class CreateAwsRegionSuccess implements Action {
   readonly type = CREATE_AWS_REGION_SUCCESS;
  constructor(public payload: AwsRegion) {}
}

// UPDATE AWS REGION
export const UPDATE_AWS_REGION = '[Builds] Update AWS Region';
export const UPDATE_AWS_REGION_FAIL = '[Builds] Update AWS Region Fail';
export const UPDATE_AWS_REGION_SUCCESS = '[Builds] Update AWS REGION Success';

export class UpdateAwsRegion implements Action {
readonly type = UPDATE_AWS_REGION;
constructor(public payload: AwsRegion) {}
}

export class UpdateAwsRegionFail implements Action {
    readonly type = UPDATE_AWS_REGION_FAIL;
    constructor(public payload: any) {}
}

export class UpdateAwsRegionSuccess implements Action {
    readonly type = UPDATE_AWS_REGION_SUCCESS;
    constructor(public payload: AwsRegion) {}
}
// ACTION TYPES
export type AwsRegionsActions =
 | LoadAwsRegions
 | LoadAwsRegionsFail
 | LoadAwsRegionsSuccess
 | CreateAwsRegion
 | CreateAwsRegionSuccess
 | CreateAwsRegionFail
 | UpdateAwsRegion
 | UpdateAwsRegionFail
 | UpdateAwsRegionSuccess;
