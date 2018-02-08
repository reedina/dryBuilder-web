import { PackerDisplayComponent } from './packer-display/packer-display.component';
import { AwsRegionsDisplayComponent } from './aws-regions-display/aws-regions-display.component';
import { AwsInstanceTypesDisplayComponent } from './aws-instance-types-display/aws-instance-types-display.component';
import { AwsAuthenticationsDisplayComponent } from './aws-authentications-display/aws-authentications-display.component';
import { FielderrorsComponent } from './fielderrors/fielderrors.component';

export const components: any[] = [
    PackerDisplayComponent,
    AwsRegionsDisplayComponent,
    AwsInstanceTypesDisplayComponent,
    AwsAuthenticationsDisplayComponent,
    FielderrorsComponent
];

export * from './packer-display/packer-display.component';
export * from './aws-regions-display/aws-regions-display.component';
export * from './aws-instance-types-display/aws-instance-types-display.component';
export * from './aws-authentications-display/aws-authentications-display.component';
export * from './fielderrors/fielderrors.component';

