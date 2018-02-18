import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../app/store';
import * as fromFeature from '../reducers';
import * as fromAmiFilterLinuxes from '../reducers/packer-ami-filter-linux.reducers';
import * as fromBuilderTypes from './packer-builder-type.selectors';

import { AmiFilterLinux } from '../../models/packer-ami-filter-linux.model';

export const getAmiFilterLinuxesState = createSelector(
  fromFeature.getBuildState , (state: fromFeature.BuildState) => state.ami_filter_linuxes
);


export const getAmiFilterLinuxesEntities = createSelector(getAmiFilterLinuxesState, fromAmiFilterLinuxes.getAmiFilterLinuxesEntities);
export const getAllAmiFilterLinuxes = createSelector(
  getAmiFilterLinuxesEntities,
 (entities) => {
     return Object.keys(entities).map(id => entities[parseInt(id, 10)]);
 }
);
export const getAmiFilterLinuxesLoaded = createSelector(getAmiFilterLinuxesState, fromAmiFilterLinuxes.getAmiFilterLinuxesLoaded);
export const getAmiFilterLinuxesLoading = createSelector(getAmiFilterLinuxesState, fromAmiFilterLinuxes.getAmiFilterLinuxesLoading);


// export const getCurrentUrl = createSelector(fromRoot.getRouterState, (state) =>  state.state && state.state.url);


// export const getQueryParamsEdit = createSelector(fromRoot.getRouterState, (state) =>  state.state && state.state.queryParams);


export const getSelectedAmiFilterLinux = createSelector(
  getAmiFilterLinuxesEntities ,
  fromRoot.getRouterState,
  (entities, router): AmiFilterLinux => {
    return router.state && entities[router.state.queryParams.edit];
  }
);

export const getSelectedAmiFilterLinuxClone = createSelector(
  getAmiFilterLinuxesEntities ,
  fromRoot.getRouterState,
  (entities, router): AmiFilterLinux => {
    return router.state && entities[router.state.queryParams.clone];
  }
);

export const getAmiFilterLinuxAmazonEbs = createSelector(
  getAllAmiFilterLinuxes,
  fromBuilderTypes.getPackerBuilderTypesAmazonEbsID,
  (elements: AmiFilterLinux[],
  builderTypeObject) => {
      return elements.filter(element => builderTypeObject.id === element.builder_types_id);
      });

export const getAmiFilterLinuxEbsSelectList = createSelector(
  getAmiFilterLinuxAmazonEbs,
  (elements: AmiFilterLinux[]) => {
    return elements.map(element => Object.assign({}, { label: element.name, value: element.id}) );
  });
