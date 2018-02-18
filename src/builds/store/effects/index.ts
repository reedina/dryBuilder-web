import { AwsRegionsEffects } from './aws-region.effects';
import { AwsInstanceTypesEffects } from './aws-instance-type.effects';
import { AwsAuthsEffects } from './aws-auth.effects';
import { PackerBuilderTypesEffects } from './packer-builder-type.effects';
import { AmiFilterLinuxesEffects } from './packer-ami-filter-linux.effects';
import { EbsBuildersEffects } from './ebs-builder.effects';

export const effects: any[] = [AwsRegionsEffects, AwsInstanceTypesEffects, AwsAuthsEffects,
    PackerBuilderTypesEffects, AmiFilterLinuxesEffects, EbsBuildersEffects ];

export * from './aws-region.effects';
export * from './aws-instance-type.effects';
export * from './aws-auth.effects';
export * from './packer-builder-type.effects';
export * from './packer-ami-filter-linux.effects';
export * from './ebs-builder.effects';