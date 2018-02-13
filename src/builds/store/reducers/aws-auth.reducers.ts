import * as fromAwsAuths from '../actions/aws-auth.actions';
import { AwsAuth } from '../../models/aws-auth.model';

export interface AwsAuthState {
   entities: {[id: number]: AwsAuth };
   loaded: boolean;
   loading: boolean;
}

// Initial State
export const initialState: AwsAuthState = {
  entities: {},
  loaded: false,
  loading: false
};

// Reducer
export function reducer(
    state = initialState,
    action: fromAwsAuths.AwsAuthsActions
) {
    switch ( action.type ) {
      case fromAwsAuths.LOAD_AWS_AUTHS: {
          return {
            ...state,
            loading: true
          };
      } // end case

      case fromAwsAuths.LOAD_AWS_AUTHS_SUCCESS: {
        const auths = action.payload;
       // const entities = [...state.entities, ...auths];
       const entities = auths.reduce(
            (accum: { [id: number]: AwsAuth}, auth: AwsAuth) => {
                return {
                    ...accum,
                [auth.id]: auth
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

      case fromAwsAuths.LOAD_AWS_AUTHS_FAIL: {
        return {
            ...state,
            loading: false,
            loaded: false
        };
      }

      case fromAwsAuths.CREATE_AWS_AUTH_SUCCESS:
      case fromAwsAuths.UPDATE_AWS_AUTH_SUCCESS: {
          const auth = action.payload;
          const entities = {
              ...state.entities,
                [auth.id]: auth
          };

          return {
            ...state,
          entities
          };
      }

      case fromAwsAuths.REMOVE_AWS_AUTH_SUCCESS: {
        const auth = action.payload;
        // [region.id]: removed will destructure our region.id out
        // ...entities will be the remaining entities that were not destructured
        const { [auth.id]: removed, ...entities}  = state.entities;

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
export const getAwsAuthsEntities = (state: AwsAuthState) => state.entities;
export const getAwsAuthsLoading = (state: AwsAuthState) => state.loading;
export const getAwsAuthsLoaded = (state: AwsAuthState) => state.loaded;
