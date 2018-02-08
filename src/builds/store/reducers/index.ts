import { ActionReducerMap, createFeatureSelector} from '@ngrx/store';
import * as fromPacker from './packer-template.reducers';
import * as fromAwsRegions from './aws-region.reducers';

export interface BuildState {
   packer: fromPacker.PackerTemplateState;
   regions: fromAwsRegions.AwsRegionState;
}

export const reducers: ActionReducerMap<BuildState> = {
  packer: fromPacker.reducer,
  regions: fromAwsRegions.reducer
};


export const getBuildState = createFeatureSelector<BuildState>('builds');
