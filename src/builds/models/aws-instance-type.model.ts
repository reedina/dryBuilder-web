
// AWS Instance Types

export class AwsInstanceTypeClass implements AwsInstanceType {
  constructor(public id = 0,
    public category = '',
    public type = '',
    public vcpu = 0,
    public memory_gb = 0) {}

}


export interface AwsInstanceType {
  id: number;
  category: string;
  type: string;
  vcpu: number;
  memory_gb: number;
}

