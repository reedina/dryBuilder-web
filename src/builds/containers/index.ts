import { AwsAuthsComponent } from './aws-authentications/aws-auths.component';
import { AwsInstanceTypesComponent } from './aws-instance-types/aws-instance-types.component';
import { AwsRegionsComponent } from './aws-regions/aws-regions.component';
import { PackerComponent } from './packer/packer.component';

export const containers: any[] = [PackerComponent, AwsAuthsComponent, AwsInstanceTypesComponent, AwsRegionsComponent ];

export * from './packer/packer.component';
export * from './aws-authentications/aws-auths.component';
export * from './aws-instance-types/aws-instance-types.component';
export * from './aws-regions/aws-regions.component';
