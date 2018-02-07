import { ITeam, Team } from  '../teams/team';

export class Project implements IProject {
    constructor(public id = 0, 
        public name = '',
        public team = new Team()) {}
}

export interface IProject {
    id: number;
    name: string;
    team: ITeam;
    }
    