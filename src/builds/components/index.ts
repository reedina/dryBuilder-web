import { PackerDisplayComponent } from './packer-display/packer-display.component';
import { AwsRegionsDisplayComponent } from './aws-regions-display/aws-regions-display.component';
import { AwsInstanceTypesDisplayComponent } from './aws-instance-types-display/aws-instance-types-display.component';
import { AwsAuthsDisplayComponent } from './aws-authentications-display/aws-auths-display.component';
import { FielderrorsComponent } from './fielderrors/fielderrors.component';

export const components: any[] = [
    PackerDisplayComponent,
    AwsRegionsDisplayComponent,
    AwsInstanceTypesDisplayComponent,
    AwsAuthsDisplayComponent,
    FielderrorsComponent
];

export * from './packer-display/packer-display.component';
export * from './aws-regions-display/aws-regions-display.component';
export * from './aws-instance-types-display/aws-instance-types-display.component';
export * from './aws-authentications-display/aws-auths-display.component';
export * from './fielderrors/fielderrors.component';

