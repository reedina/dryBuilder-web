
// Ebs Builder

export class EbsBuilderClass implements EbsBuilder {
  constructor(public id = 0,
    public builder_name = '',
    public ami_name = '',
    public aws_auth_id = 0,
    public aws_regions_id = 0,
    public aws_instance_types_id = 0,
    public aws_src_ami_filter_linux_id = 0,
    public ssh_username = '') {}

}


export interface EbsBuilder {
  id: number;
  builder_name: string;
  ami_name: string;
  aws_auth_id: number;
  aws_regions_id: number;
  aws_instance_types_id: number;
  aws_src_ami_filter_linux_id: number;
  ssh_username: string;
}

