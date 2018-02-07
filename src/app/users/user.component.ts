import { Component, OnInit } from '@angular/core';
import { MenuItem, DataTable, LazyLoadEvent } from "primeng/primeng";
import { FormBuilder, FormGroup, Validators, AbstractControl } from "@angular/forms";

import {Observable} from 'rxjs/Rx';
import { UserService } from './user.service';
import { IUser, User} from './user';
import {ITeam, Team} from '../teams/team';
import {Message} from 'primeng/primeng';
import { TeamService } from '../teams/team.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  teamsDd =  [];
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  msgs: Message[] = [];
  userForm: FormGroup;
  user: User = new User()
  users: Array<IUser>;
  teams: Array<ITeam>;  
  resp: any;

  teamsDropdown = [];

  constructor(private fb: FormBuilder, private userService: UserService, private teamService: TeamService) { 
    this.userForm = this.fb.group({
      first_name:  ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      last_name:  ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],   
      email:  ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern(this.emailPattern)]],           
      team: ['',[Validators.required]]
      });

  }

  ngOnInit() {

    this.userService.getUsers().
     do(res => console.log(res)).
     subscribe( res => { this.users = res });

     this.teamService.getTeams().
     do(res => console.log(res)).
     subscribe( res => { 
       this.teams = res;
       this.createTeamsDropdown();
      });
    
  }

  createTeamsDropdown() {

    this.teamsDd = [];
    this.teamsDd.push({label: 'Select Team', value: null});
     for ( let t  of this.teams)     {
          this.teamsDd.push({label: t.name, value: t});
    }

  }
  showError(message: string) {
    this.msgs = [];
    this.msgs.push({severity: 'error', summary: 'Error Message', detail: message});
}

  showSuccess(name: string) {
    this.msgs = [];
    this.msgs.push({severity: 'success', summary: 'Success', detail: `Added ${this.truncate(name)}`});
}

  truncate(string){
    if (string.length > 10)
       return string.substring(0,10)+'...';
    else
       return string;
}

  onReset() {
    this.userForm.reset();
}

updateUsers() {
  this.userService.getUsers().
  do(res => console.log(res)).
  subscribe( res => { this.users = res });
}

save(): void {
  if (this.userForm.dirty && this.userForm.valid) {
    console.log('Attempting to Save: ' + JSON.stringify(this.userForm.value))
    let t = Object.assign({}, this.user, this.userForm.value);
    this.userService.saveUser(t)
      .subscribe(
         (r) => {console.log(`Successfully Saved Form: ${r.first_name}`);
                 this.resp = r.first_name;
                 this.updateUsers();
                 this.userForm.reset();
                 this.showSuccess(r.first_name);
       },
           (e) => {  this.userForm.reset(); this.showError(e);}

      );
  }  else {
      // Remember, you only save a "valid" form
      console.log("Form not dirty and valid")
  }

}

}
