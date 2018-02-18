import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../app/store';
import * as fromFeature from '../reducers';
import * as fromAwsAuths from '../reducers/aws-auth.reducers';

import { AwsAuth } from '../../models/aws-auth.model';

export const getAwsAuthsState = createSelector(
  fromFeature.getBuildState , (state: fromFeature.BuildState) => state.auths
);


export const getAwsAuthsEntities = createSelector(getAwsAuthsState, fromAwsAuths.getAwsAuthsEntities);
export const getAllAwsAuths = createSelector(
  getAwsAuthsEntities,
 (entities) => {
     return Object.keys(entities).map(id => entities[parseInt(id, 10)]);
 }
);
export const getAwsAuthsLoaded = createSelector(getAwsAuthsState, fromAwsAuths.getAwsAuthsLoaded);
export const getAwsAuthsLoading = createSelector(getAwsAuthsState, fromAwsAuths.getAwsAuthsLoading);


// export const getCurrentUrl = createSelector(fromRoot.getRouterState, (state) =>  state.state && state.state.url);


// export const getQueryParamsEdit = createSelector(fromRoot.getRouterState, (state) =>  state.state && state.state.queryParams);


export const getSelectedAuth = createSelector(
  getAwsAuthsEntities ,
  fromRoot.getRouterState,
  (entities, router): AwsAuth => {
    return router.state && entities[router.state.queryParams.edit];
  }

);


export const getAwsAuthSelectList = createSelector(
  getAllAwsAuths,
  (elements: AwsAuth[]) => {
      return elements.map(element => Object.assign({}, { label: element.account_name, value: element.id}) );
  }
);

