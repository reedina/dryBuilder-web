import * as fromPackerBuilderTypes from '../actions/packer-builder-type.actions';
import { PackerBuilderType } from '../../models/packer-builder-type.model';

export interface PackerBuilderTypeState {
   entities: {[id: number]: PackerBuilderType };
   loaded: boolean;
   loading: boolean;
}

// Initial State
export const initialState: PackerBuilderTypeState = {
  entities: {},
  loaded: false,
  loading: false
};

// Reducer
export function reducer(
    state = initialState,
    action: fromPackerBuilderTypes.PackerBuilderTypesActions
) {
    switch ( action.type ) {
      case fromPackerBuilderTypes.LOAD_PACKER_BUILDER_TYPES: {
          return {
            ...state,
            loading: true
          };
      } // end case

      case fromPackerBuilderTypes.LOAD_PACKER_BUILDER_TYPES_SUCCESS: {
        const builder_types = action.payload;
       // const entities = [...state.entities, ...builder_types];
       const entities = builder_types.reduce(
            (accum: { [id: number]: PackerBuilderType}, builder_type: PackerBuilderType) => {
                return {
                    ...accum,
                [builder_type.id]: builder_type
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

      case fromPackerBuilderTypes.LOAD_PACKER_BUILDER_TYPES_FAIL: {
        return {
            ...state,
            loading: false,
            loaded: false
        };
      }

      case fromPackerBuilderTypes.CREATE_PACKER_BUILDER_TYPE_SUCCESS:
      case fromPackerBuilderTypes.UPDATE_PACKER_BUILDER_TYPE_SUCCESS: {
          const builder_type = action.payload;
          const entities = {
              ...state.entities,
                [builder_type.id]: builder_type
          };

          return {
            ...state,
          entities
          };
      }

      case fromPackerBuilderTypes.REMOVE_PACKER_BUILDER_TYPE_SUCCESS: {
        const builder_type = action.payload;
        // [region.id]: removed will destructure our region.id out
        // ...entities will be the remaining entities that were not destructured
        const { [builder_type.id]: removed, ...entities}  = state.entities;

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
export const getPackerBuilderTypesEntities = (state: PackerBuilderTypeState) => state.entities;
export const getPackerBuilderTypesLoading = (state: PackerBuilderTypeState) => state.loading;
export const getPackerBuilderTypesLoaded = (state: PackerBuilderTypeState) => state.loaded;
