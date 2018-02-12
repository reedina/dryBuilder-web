import { AwsRegionsService } from './aws-regions.service';
import { AwsInstanceTypesService } from './aws-instance-types.service';


export const services: any[] = [AwsRegionsService, AwsInstanceTypesService];

export * from './aws-regions.service';
export * from './aws-instance-types.service';
