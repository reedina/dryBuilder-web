import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../app/store';
import * as fromFeature from '../reducers';
import * as fromUserDataFiles from '../reducers/user-data-file.reducers';

import { UserDataFile } from '../../models/user-data-file.model';

export const getUserDataFilesState = createSelector(
  fromFeature.getBuildState , (state: fromFeature.BuildState) => state.user_data_files
);


export const getUserDataFilesEntities = createSelector(getUserDataFilesState, fromUserDataFiles.getUserDataFilesEntities);
export const getAllUserDataFiles = createSelector(
  getUserDataFilesEntities,
 (entities) => {
     return Object.keys(entities).map(id => entities[parseInt(id, 10)]);
 }
);
export const getUserDataFilesLoaded = createSelector(getUserDataFilesState, fromUserDataFiles.getUserDataFilesLoaded);
export const getUserDataFilesLoading = createSelector(getUserDataFilesState, fromUserDataFiles.getUserDataFilesLoading);


// export const getCurrentUrl = createSelector(fromRoot.getRouterState, (state) =>  state.state && state.state.url);


// export const getQueryParamsEdit = createSelector(fromRoot.getRouterState, (state) =>  state.state && state.state.queryParams);


export const getSelectedUserDataFile = createSelector(
  getUserDataFilesEntities ,
  fromRoot.getRouterState,
  (entities, router): UserDataFile => {
    return router.state && entities[router.state.queryParams.edit];
  }

);

export const getUserDataFileSelectList = createSelector(
  getAllUserDataFiles,
  (elements: UserDataFile[]) => {
      return elements.map(element => Object.assign({}, { label: element.name, value: element.id}) );
  }
);


