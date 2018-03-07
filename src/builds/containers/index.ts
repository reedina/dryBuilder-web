import { AwsAuthsComponent } from './aws-authentications/aws-auths.component';
import { AwsInstanceTypesComponent } from './aws-instance-types/aws-instance-types.component';
import { AwsRegionsComponent } from './aws-regions/aws-regions.component';
import { PackerComponent } from './packer/packer.component';
import { PackerBuilderTypesComponent } from './packer-builder-types/packer-builder-types.component';
import { AmiFilterLinuxesComponent } from './packer-ami-filter-linuxes/packer-ami-filter-linuxes.component';
import { EbsBuildersComponent } from './ebs-builders/ebs-builders.component';
import { UserDataFilesComponent } from './user-data-files/user-data-files.component';

export const containers: any[] = [PackerComponent, AwsAuthsComponent, AwsInstanceTypesComponent,
     AwsRegionsComponent, PackerBuilderTypesComponent, AmiFilterLinuxesComponent, EbsBuildersComponent, UserDataFilesComponent ];

export * from './packer/packer.component';
export * from './aws-authentications/aws-auths.component';
export * from './aws-instance-types/aws-instance-types.component';
export * from './aws-regions/aws-regions.component';
export * from './packer-builder-types/packer-builder-types.component';
export * from './packer-ami-filter-linuxes/packer-ami-filter-linuxes.component';
export * from './ebs-builders/ebs-builders.component';
export * from './user-data-files/user-data-files.component';
