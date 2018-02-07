import { ITeam, Team } from  '../teams/team';

export class User implements IUser {
    constructor(public id = 0, 
        public first_name = '',
        public last_name = '',
        public email = '',
        public team = new Team()) {}
}


export interface IUser {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    team: ITeam;
    }
    