
// AWS Regions

export class AwsRegionClass implements AwsRegion {
  constructor(public id = 0,
    public name = '',
    public region = '',
    public endpoint = '' ) {}

}


export interface AwsRegion {
  id: number;
  name: string;
  region: string;
  endpoint: string;
}

