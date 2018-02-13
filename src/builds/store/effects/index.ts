import { AwsRegionsEffects } from './aws-region.effects';
import { AwsInstanceTypesEffects } from './aws-instance-type.effects';
import { AwsAuthsEffects } from './aws-auth.effects';


export const effects: any[] = [AwsRegionsEffects, AwsInstanceTypesEffects, AwsAuthsEffects ];

export * from './aws-region.effects';
export * from './aws-instance-type.effects';
export * from './aws-auth.effects';
