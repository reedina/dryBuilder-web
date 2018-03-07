import { PackerDisplayComponent } from './packer-display/packer-display.component';
import { AwsRegionsDisplayComponent } from './aws-regions-display/aws-regions-display.component';
import { AwsInstanceTypesDisplayComponent } from './aws-instance-types-display/aws-instance-types-display.component';
import { AwsAuthsDisplayComponent } from './aws-authentications-display/aws-auths-display.component';
import { FielderrorsComponent } from './fielderrors/fielderrors.component';
import { PackerBuilderTypesDisplayComponent } from './packer-builder-types-display/packer-builder-types-display.component';
import { AmiFilterLinuxsDisplayComponent } from './packer-ami-filter-linuxes-display/packer-ami-filter-linuxes-display.component';
import { EbsBuildersDisplayComponent } from './ebs-builders/ebs-builders-display.component';
import { UserDataFilesDisplayComponent } from './user-data-files-display/user-data-files-display.component';

export const components: any[] = [
    PackerDisplayComponent,
    AwsRegionsDisplayComponent,
    AwsInstanceTypesDisplayComponent,
    AwsAuthsDisplayComponent,
    FielderrorsComponent,
    PackerBuilderTypesDisplayComponent,
    AmiFilterLinuxsDisplayComponent,
    EbsBuildersDisplayComponent,
    UserDataFilesDisplayComponent
];

export * from './packer-display/packer-display.component';
export * from './aws-regions-display/aws-regions-display.component';
export * from './aws-instance-types-display/aws-instance-types-display.component';
export * from './aws-authentications-display/aws-auths-display.component';
export * from './fielderrors/fielderrors.component';
export * from './packer-builder-types-display/packer-builder-types-display.component';
export * from './packer-ami-filter-linuxes-display/packer-ami-filter-linuxes-display.component';
export * from './ebs-builders/ebs-builders-display.component';
export * from './user-data-files-display/user-data-files-display.component';
