import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../app/store';
import * as fromFeature from '../reducers';
import * as fromAwsInstanceTypes from '../reducers/aws-instance-type.reducers';

import { AwsInstanceType } from '../../models/aws-instance-type.model';

export const getAwsInstanceTypesState = createSelector(
  fromFeature.getBuildState , (state: fromFeature.BuildState) => state.instance_types
);


export const getAwsInstanceTypesEntities = createSelector(getAwsInstanceTypesState, fromAwsInstanceTypes.getAwsInstanceTypesEntities);
export const getAllAwsInstanceTypes = createSelector(
  getAwsInstanceTypesEntities,
 (entities) => {
     return Object.keys(entities).map(id => entities[parseInt(id, 10)]);
 }
);
export const getAwsInstanceTypesLoaded = createSelector(getAwsInstanceTypesState, fromAwsInstanceTypes.getAwsInstanceTypesLoaded);
export const getAwsInstanceTypesLoading = createSelector(getAwsInstanceTypesState, fromAwsInstanceTypes.getAwsInstanceTypesLoading);


// export const getCurrentUrl = createSelector(fromRoot.getRouterState, (state) =>  state.state && state.state.url);


// export const getQueryParamsEdit = createSelector(fromRoot.getRouterState, (state) =>  state.state && state.state.queryParams);


export const getSelectedInstanceType = createSelector(
  getAwsInstanceTypesEntities ,
  fromRoot.getRouterState,
  (entities, router): AwsInstanceType => {
    return router.state && entities[router.state.queryParams.edit];
  }

);

