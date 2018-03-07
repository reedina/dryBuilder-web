import { ActionReducerMap, createFeatureSelector} from '@ngrx/store';
import * as fromPacker from './packer-template.reducers';
import * as fromAwsRegions from './aws-region.reducers';
import * as fromAwsInstanceTypes from './aws-instance-type.reducers';
import * as fromAwsAuths from './aws-auth.reducers';
import * as fromPackerBuilderTypes from './packer-builder-type.reducers';
import * as fromAmiFilterLinuxes from './packer-ami-filter-linux.reducers';
import * as fromEbsBuilders from './ebs-builder.reducers';
import * as fromUserDataFiles from './user-data-file.reducers';

export interface BuildState {
   packer: fromPacker.PackerTemplateState;
   regions: fromAwsRegions.AwsRegionState;
   instance_types: fromAwsInstanceTypes.AwsInstanceTypeState;
   auths: fromAwsAuths.AwsAuthState;
   packer_builder_types: fromPackerBuilderTypes.PackerBuilderTypeState;
   ami_filter_linuxes: fromAmiFilterLinuxes.AmiFilterLinuxState;
   ebs_builders: fromEbsBuilders.EbsBuilderState;
   user_data_files: fromUserDataFiles.UserDataFileState;
}

export const reducers: ActionReducerMap<BuildState> = {
  packer: fromPacker.reducer,
  regions: fromAwsRegions.reducer,
  instance_types: fromAwsInstanceTypes.reducer,
  auths: fromAwsAuths.reducer,
  packer_builder_types: fromPackerBuilderTypes.reducer,
  ami_filter_linuxes: fromAmiFilterLinuxes.reducer,
  ebs_builders: fromEbsBuilders.reducer,
  user_data_files: fromUserDataFiles.reducer,
};


export const getBuildState = createFeatureSelector<BuildState>('builds');
