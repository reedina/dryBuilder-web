import * as fromUserDataFiles from '../actions/user-data-file.actions';
import { UserDataFile } from '../../models/user-data-file.model';

export interface UserDataFileState {
   entities: {[id: number]: UserDataFile };
   loaded: boolean;
   loading: boolean;
}

// Initial State
export const initialState: UserDataFileState = {
   entities: {},
  loaded: false,
  loading: false
};

// Reducer
export function reducer(
    state = initialState,
    action: fromUserDataFiles.UserDataFilesActions
) {
    switch ( action.type ) {
      case fromUserDataFiles.LOAD_USER_DATA_FILES: {
          return {
            ...state,
            loading: true
          };
      } // end case

      case fromUserDataFiles.LOAD_USER_DATA_FILES_SUCCESS: {
        const user_data_files = action.payload;
       // const entities = [...state.entities, ...user_data_files];
       const entities = user_data_files.reduce(
            (accum: { [id: number]: UserDataFile}, user_data_file: UserDataFile) => {
                return {
                    ...accum,
                [user_data_file.id]: user_data_file
                };
            },  { ...state.entities }
        );
        return {
            ...state,
            loading: false,
            loaded: true,
            entities
        };
      } // end case

      case fromUserDataFiles.LOAD_USER_DATA_FILES_FAIL: {
        return {
            ...state,
            loading: false,
            loaded: false
        };
      }

      case fromUserDataFiles.CREATE_USER_DATA_FILE_SUCCESS:
      case fromUserDataFiles.UPDATE_USER_DATA_FILE_SUCCESS: {
          const user_data_file = action.payload;
          const entities = {
              ...state.entities,
                [user_data_file.id]: user_data_file
          };

          return {
            ...state,
          entities
          };
      }

      case fromUserDataFiles.REMOVE_USER_DATA_FILE_SUCCESS: {
        const user_data_file = action.payload;
        // [user_data_file.id]: removed will destructure our user_data_file.id out
        // ...entities will be the remaining entities that were not destructured
        const { [user_data_file.id]: removed, ...entities}  = state.entities;

        return {

          ...state,
          entities
        };
      }

    }  // end switch
    return state;
}


// Selector Functions
// Given Entity return slice of entity state
export const getUserDataFilesEntities = (state: UserDataFileState) => state.entities;
export const getUserDataFilesLoading = (state: UserDataFileState) => state.loading;
export const getUserDataFilesLoaded = (state: UserDataFileState) => state.loaded;
