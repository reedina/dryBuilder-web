import * as fromAwsInstanceTypes from '../actions/aws-instance-type.actions';
import { AwsInstanceType } from '../../models/aws-instance-type.model';

export interface AwsInstanceTypeState {
   entities: {[id: number]: AwsInstanceType };
   loaded: boolean;
   loading: boolean;
}

// Initial State
export const initialState: AwsInstanceTypeState = {
  entities: {},
  loaded: false,
  loading: false
};

// Reducer
export function reducer(
    state = initialState,
    action: fromAwsInstanceTypes.AwsInstanceTypesActions
) {
    switch ( action.type ) {
      case fromAwsInstanceTypes.LOAD_AWS_INSTANCE_TYPES: {
          return {
            ...state,
            loading: true
          };
      } // end case

      case fromAwsInstanceTypes.LOAD_AWS_INSTANCE_TYPES_SUCCESS: {
        const instance_types = action.payload;
       // const entities = [...state.entities, ...instance_types];
       const entities = instance_types.reduce(
            (accum: { [id: number]: AwsInstanceType}, instance_type: AwsInstanceType) => {
                return {
                    ...accum,
                [instance_type.id]: instance_type
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

      case fromAwsInstanceTypes.LOAD_AWS_INSTANCE_TYPES_FAIL: {
        return {
            ...state,
            loading: false,
            loaded: false
        };
      }

      case fromAwsInstanceTypes.CREATE_AWS_INSTANCE_TYPE_SUCCESS:
      case fromAwsInstanceTypes.UPDATE_AWS_INSTANCE_TYPE_SUCCESS: {
          const instance_type = action.payload;
          const entities = {
              ...state.entities,
                [instance_type.id]: instance_type
          };

          return {
            ...state,
          entities
          };
      }

      case fromAwsInstanceTypes.REMOVE_AWS_INSTANCE_TYPE_SUCCESS: {
        const instance_type = action.payload;
        // [region.id]: removed will destructure our region.id out
        // ...entities will be the remaining entities that were not destructured
        const { [instance_type.id]: removed, ...entities}  = state.entities;

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
export const getAwsInstanceTypesEntities = (state: AwsInstanceTypeState) => state.entities;
export const getAwsInstanceTypesLoading = (state: AwsInstanceTypeState) => state.loading;
export const getAwsInstanceTypesLoaded = (state: AwsInstanceTypeState) => state.loaded;
