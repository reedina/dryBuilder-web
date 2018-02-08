import { AwsAuthenticationsComponent } from './aws-authentications/aws-authentications.component';
import { AwsInstanceTypesComponent } from './aws-instance-types/aws-instance-types.component';
import { AwsRegionsComponent } from './aws-regions/aws-regions.component';
import { PackerComponent } from './packer/packer.component';

export const containers: any[] = [PackerComponent, AwsAuthenticationsComponent, AwsInstanceTypesComponent, AwsRegionsComponent ];

export * from './packer/packer.component';
export * from './aws-authentications/aws-authentications.component';
export * from './aws-instance-types/aws-instance-types.component';
export * from './aws-regions/aws-regions.component';
