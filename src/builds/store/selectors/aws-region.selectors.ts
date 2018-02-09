import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../app/store';
import * as fromFeature from '../reducers';
import * as fromAwsRegions from '../reducers/aws-region.reducers';

import { AwsRegion } from '../../models/aws-region.model';

export const getAwsRegionsState = createSelector(
  fromFeature.getBuildState , (state: fromFeature.BuildState) => state.regions
);


export const getAwsRegionsEntities = createSelector(getAwsRegionsState, fromAwsRegions.getAwsRegionsEntities);
export const getAllAwsRegions = createSelector(
  getAwsRegionsEntities,
 (entities) => {
     return Object.keys(entities).map(id => entities[parseInt(id, 10)]);
 }
);
export const getAwsRegionsLoaded = createSelector(getAwsRegionsState, fromAwsRegions.getAwsRegionsLoaded);
export const getAwsRegionsLoading = createSelector(getAwsRegionsState, fromAwsRegions.getAwsRegionsLoading);



