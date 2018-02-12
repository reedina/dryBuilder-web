import { ActionReducerMap, createFeatureSelector} from '@ngrx/store';
import * as fromPacker from './packer-template.reducers';
import * as fromAwsRegions from './aws-region.reducers';
import * as fromAwsInstanceTypes from './aws-instance-type.reducers';

export interface BuildState {
   packer: fromPacker.PackerTemplateState;
   regions: fromAwsRegions.AwsRegionState;
   instance_types: fromAwsInstanceTypes.AwsInstanceTypeState;
}

export const reducers: ActionReducerMap<BuildState> = {
  packer: fromPacker.reducer,
  regions: fromAwsRegions.reducer,
  instance_types: fromAwsInstanceTypes.reducer
};


export const getBuildState = createFeatureSelector<BuildState>('builds');
