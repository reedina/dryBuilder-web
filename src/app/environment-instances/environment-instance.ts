import { IEnvironment, Environment} from '../environments/environment'

export class EnvironmentInstance implements IEnvironmentInstance {
    constructor(public id = 0, 
        public name = '',
        public deletion_time = '',
        public environment = new Environment()) {}        
}


export interface IEnvironmentInstance {
    id: number;
    name: string;
    deletion_time: string;
    environment: IEnvironment
}
    