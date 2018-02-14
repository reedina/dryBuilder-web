import { AwsRegionsService } from './aws-regions.service';
import { AwsInstanceTypesService } from './aws-instance-types.service';
import { AwsAuthsService } from './aws-auths.service';
import { PackerBuilderTypesService } from './packer-builder-types.service';

export const services: any[] = [AwsRegionsService, AwsInstanceTypesService, AwsAuthsService, PackerBuilderTypesService];

export * from './aws-regions.service';
export * from './aws-instance-types.service';
export * from './aws-auths.service';
export * from './packer-builder-types.service';
