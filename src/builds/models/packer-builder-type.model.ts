
// Packer BUilder Type

export class PackerBuilderTypeClass implements PackerBuilderType {
  constructor(public id = 0,
    public name = '',
    public description = '',
    public type = '') {}

}


export interface PackerBuilderType {
  id: number;
  name: string;
  description: string;
  type: string;
}
