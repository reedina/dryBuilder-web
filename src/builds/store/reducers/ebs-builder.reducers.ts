import * as fromEbsBuilders from '../actions/ebs-builder.actions';
import { EbsBuilder } from '../../models/ebs-builder.model';

export interface EbsBuilderState {
   entities: {[id: number]: EbsBuilder };
   loaded: boolean;
   loading: boolean;
}

// Initial State
export const initialState: EbsBuilderState = {
  entities: {},
  loaded: false,
  loading: false
};

// Reducer
export function reducer(
    state = initialState,
    action: fromEbsBuilders.EbsBuildersActions
) {
    switch ( action.type ) {
      case fromEbsBuilders.LOAD_EBS_BUILDERS: {
          return {
            ...state,
            loading: true
          };
      } // end case

      case fromEbsBuilders.LOAD_EBS_BUILDERS_SUCCESS: {
        const ebses = action.payload;
       // const entities = [...state.entities, ...ebses];
       const entities = ebses.reduce(
            (accum: { [id: number]: EbsBuilder}, ebs: EbsBuilder) => {
                return {
                    ...accum,
                [ebs.id]: ebs
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

      case fromEbsBuilders.LOAD_EBS_BUILDERS_FAIL: {
        return {
            ...state,
            loading: false,
            loaded: false
        };
      }

      case fromEbsBuilders.CREATE_EBS_BUILDER_SUCCESS:
      case fromEbsBuilders.UPDATE_EBS_BUILDER_SUCCESS: {
          const ebs = action.payload;
          const entities = {
              ...state.entities,
                [ebs.id]: ebs
          };

          return {
            ...state,
          entities
          };
      }

      case fromEbsBuilders.REMOVE_EBS_BUILDER_SUCCESS: {
        const ebs = action.payload;
        // [region.id]: removed will destructure our region.id out
        // ...entities will be the remaining entities that were not destructured
        const { [ebs.id]: removed, ...entities}  = state.entities;

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
export const getEbsBuildersEntities = (state: EbsBuilderState) => state.entities;
export const getEbsBuildersLoading = (state: EbsBuilderState) => state.loading;
export const getEbsBuildersLoaded = (state: EbsBuilderState) => state.loaded;
