import { AwsRegionsEffects } from './aws-region.effects';
import { AwsInstanceTypesEffects } from './aws-instance-type.effects';


export const effects: any[] = [AwsRegionsEffects, AwsInstanceTypesEffects ];

export * from './aws-region.effects';
export * from './aws-instance-type.effects';
