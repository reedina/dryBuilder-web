
// AWS Instance Types

export class AmiFilterLinuxClass implements AmiFilterLinux {
    public id: number;
    public builder_types_id: number;
    public ssh_username: string;
    public virtualization_type: string;
    public name: string;
    public 'root-device-type': string;
    public most_recent: boolean;
    public owners: string;

  constructor(id = 0,
    builder_types_id = 0,
    ssh_username = '',
    virtualization_type = '',
    name = '',
    root_device_type = '',
    most_recent = true,
    owners = '') {

    this.id = id;
    this.builder_types_id = builder_types_id;
    this.ssh_username = ssh_username;
    this.virtualization_type = virtualization_type;
    this.name = name;
    this['root-device-type'] = root_device_type;
    this.most_recent = most_recent;
    this.owners = owners;

    }

}


export interface AmiFilterLinux {
  id: number;
  builder_types_id: number;
  ssh_username: string;
  virtualization_type: string;
  name: string;
  'root-device-type': string;
  most_recent: boolean;
  owners: string;
}

