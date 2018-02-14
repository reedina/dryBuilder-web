import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../app/store';
import * as fromFeature from '../reducers';
import * as fromPackerBuilderTypes from '../reducers/packer-builder-type.reducers';

import { PackerBuilderType } from '../../models/packer-builder-type.model';

export const getPackerBuilderTypesState = createSelector(
  fromFeature.getBuildState , (state: fromFeature.BuildState) => state.packer_builder_types
);


export const getPackerBuilderTypesEntities = createSelector(getPackerBuilderTypesState,
  fromPackerBuilderTypes.getPackerBuilderTypesEntities);

export const getAllPackerBuilderTypes = createSelector(
  getPackerBuilderTypesEntities,
 (entities) => {
     return Object.keys(entities).map(id => entities[parseInt(id, 10)]);
 }
);
export const getPackerBuilderTypesLoaded = createSelector(getPackerBuilderTypesState, fromPackerBuilderTypes.getPackerBuilderTypesLoaded);
export const getPackerBuilderTypesLoading = createSelector(getPackerBuilderTypesState, fromPackerBuilderTypes.getPackerBuilderTypesLoading);


// export const getCurrentUrl = createSelector(fromRoot.getRouterState, (state) =>  state.state && state.state.url);


// export const getQueryParamsEdit = createSelector(fromRoot.getRouterState, (state) =>  state.state && state.state.queryParams);


export const getSelectedPackerBuilderType = createSelector(
  getPackerBuilderTypesEntities ,
  fromRoot.getRouterState,
  (entities, router): PackerBuilderType => {
    return router.state && entities[router.state.queryParams.edit];
  }

);

