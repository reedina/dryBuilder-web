import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../app/store';
import * as fromFeature from '../reducers';
import * as fromEbsBuilders from '../reducers/ebs-builder.reducers';

import { EbsBuilder } from '../../models/ebs-builder.model';

export const getEbsBuildersState = createSelector(
  fromFeature.getBuildState , (state: fromFeature.BuildState) => state.ebs_builders
);


export const getEbsBuildersEntities = createSelector(getEbsBuildersState, fromEbsBuilders.getEbsBuildersEntities);
export const getAllEbsBuilders = createSelector(
  getEbsBuildersEntities,
 (entities) => {
     return Object.keys(entities).map(id => entities[parseInt(id, 10)]);
 }
);
export const getEbsBuildersLoaded = createSelector(getEbsBuildersState, fromEbsBuilders.getEbsBuildersLoaded);
export const getEbsBuildersLoading = createSelector(getEbsBuildersState, fromEbsBuilders.getEbsBuildersLoading);


// export const getCurrentUrl = createSelector(fromRoot.getRouterState, (state) =>  state.state && state.state.url);


// export const getQueryParamsEdit = createSelector(fromRoot.getRouterState, (state) =>  state.state && state.state.queryParams);


export const getSelectedEbsBuilder = createSelector(
  getEbsBuildersEntities ,
  fromRoot.getRouterState,
  (entities, router): EbsBuilder => {
    return router.state && entities[router.state.queryParams.edit];
  }

);

export const getSelectedEbsBuilderClone = createSelector(
  getEbsBuildersEntities ,
  fromRoot.getRouterState,
  (entities, router): EbsBuilder => {
    return router.state && entities[router.state.queryParams.clone];
  }
);
