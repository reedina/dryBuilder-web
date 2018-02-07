
export class Environment implements IEnvironment {
    constructor(public id = 0, 
        public name = '',
        public type = '',
        public url = '') {}        
}



export interface IEnvironment {
    id: number;
    name: string;
    type: string;
    url: string;
}
    