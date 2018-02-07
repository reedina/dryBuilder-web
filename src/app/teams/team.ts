export class Team implements ITeam {
    constructor(public id = 0, public name = '') {}
}

export interface ITeam {
    id: number;
    name: string;
}
    