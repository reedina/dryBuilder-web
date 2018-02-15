
// AWS Instance Types

export class AmiFilterLinuxClass implements AmiFilterLinux {
  constructor(public id = 0,
    public builder_types_id = 0,
    public friendly_name = '',
    public description = '',
    public ssh_username = '',
    public virtualization_type = '',
    public name = '',
    public root_device_type = '',
    public most_recent = false,
    public owners = '') {}

}


export interface AmiFilterLinux {
  id: number;
  builder_types_id: number;
  friendly_name: string;
  description: string;
  ssh_username: string;
  virtualization_type: string;
  name: string;
  root_device_type: string;
  most_recent: boolean;
  owners: string;
}

