import * as fromAwsRegions from '../actions/aws-region.actions';
import { AwsRegion } from '../../models/aws-region.model';

export interface AwsRegionState {
   entities: {[id: number]: AwsRegion };
   loaded: boolean;
   loading: boolean;
}

// Initial State
export const initialState: AwsRegionState = {
   entities: {},
  loaded: false,
  loading: false
};

// Reducer
export function reducer(
    state = initialState,
    action: fromAwsRegions.AwsRegionsActions
) {
    switch ( action.type ) {
      case fromAwsRegions.LOAD_AWS_REGIONS: {
          return {
            ...state,
            loading: true
          };
      } // end case

      case fromAwsRegions.LOAD_AWS_REGIONS_SUCCESS: {
        const regions = action.payload;
       // const entities = [...state.entities, ...regions];
       const entities = regions.reduce(
            (accum: { [id: number]: AwsRegion}, region: AwsRegion) => {
                return {
                    ...accum,
                [region.id]: region
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

      case fromAwsRegions.LOAD_AWS_REGIONS_FAIL: {
        return {
            ...state,
            loading: false,
            loaded: false
        };
      }

      case fromAwsRegions.CREATE_AWS_REGION_SUCCESS: {
          const region = action.payload;
          const entities = {
              ...state.entities,
                [region.id]: region
          };

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
export const getAwsRegionsEntities = (state: AwsRegionState) => state.entities;
export const getAwsRegionsLoading = (state: AwsRegionState) => state.loading;
export const getAwsRegionsLoaded = (state: AwsRegionState) => state.loaded;
