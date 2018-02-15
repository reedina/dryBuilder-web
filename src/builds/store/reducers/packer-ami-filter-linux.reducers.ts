import * as fromAmiFilterLinuxes from '../actions/packer-ami-filter-linux.actions';
import { AmiFilterLinux } from '../../models/packer-ami-filter-linux.model';

export interface AmiFilterLinuxState {
   entities: {[id: number]: AmiFilterLinux };
   loaded: boolean;
   loading: boolean;
}

// Initial State
export const initialState: AmiFilterLinuxState = {
  entities: {},
  loaded: false,
  loading: false
};

// Reducer
export function reducer(
    state = initialState,
    action: fromAmiFilterLinuxes.AmiFilterLinuxesActions
) {
    switch ( action.type ) {
      case fromAmiFilterLinuxes.LOAD_AMI_FILTER_LINUXES: {
          return {
            ...state,
            loading: true
          };
      } // end case

      case fromAmiFilterLinuxes.LOAD_AMI_FILTER_LINUXES_SUCCESS: {
        const ami_filter_linuxes = action.payload;
       // const entities = [...state.entities, ...ami_filter_linuxes];
       const entities = ami_filter_linuxes.reduce(
            (accum: { [id: number]: AmiFilterLinux}, ami_filter_linux: AmiFilterLinux) => {
                return {
                    ...accum,
                [ami_filter_linux.id]: ami_filter_linux
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

      case fromAmiFilterLinuxes.LOAD_AMI_FILTER_LINUXES_FAIL: {
        return {
            ...state,
            loading: false,
            loaded: false
        };
      }

      case fromAmiFilterLinuxes.CREATE_AMI_FILTER_LINUX_SUCCESS:
      case fromAmiFilterLinuxes.UPDATE_AMI_FILTER_LINUX_SUCCESS: {
          const ami_filter_linux = action.payload;
          const entities = {
              ...state.entities,
                [ami_filter_linux.id]: ami_filter_linux
          };

          return {
            ...state,
          entities
          };
      }

      case fromAmiFilterLinuxes.REMOVE_AMI_FILTER_LINUX_SUCCESS: {
        const ami_filter_linux = action.payload;
        // [region.id]: removed will destructure our region.id out
        // ...entities will be the remaining entities that were not destructured
        const { [ami_filter_linux.id]: removed, ...entities}  = state.entities;

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
export const getAmiFilterLinuxesEntities = (state: AmiFilterLinuxState) => state.entities;
export const getAmiFilterLinuxesLoading = (state: AmiFilterLinuxState) => state.loading;
export const getAmiFilterLinuxesLoaded = (state: AmiFilterLinuxState) => state.loaded;
