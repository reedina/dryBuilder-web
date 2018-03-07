
// User Data File

export class UserDataFileClass implements UserDataFile {
  constructor(public id = 0,
    public name = '',
    public description = '',
    public source_code = '',
    public tags = '' ) {}
}


export interface UserDataFile {
  id: number;
  name: string;
  description: string;
  source_code: string;
  tags: string;
}

