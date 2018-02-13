import { AwsRegionsService } from './aws-regions.service';
import { AwsInstanceTypesService } from './aws-instance-types.service';
import { AwsAuthsService } from './aws-auths.service';


export const services: any[] = [AwsRegionsService, AwsInstanceTypesService, AwsAuthsService];

export * from './aws-regions.service';
export * from './aws-instance-types.service';
export * from './aws-auths.service';
