import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from "@angular/forms";
import { MenuItem, DataTable, LazyLoadEvent } from "primeng/primeng";
import {Observable} from 'rxjs/Rx';
import { TeamService } from './team.service';
import { ITeam, Team } from './team';
import {Message} from 'primeng/primeng';


@Component({
  selector: 'at-alltimes',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

    msgs: Message[] = [];
    teamForm: FormGroup;
    team: Team = new Team();
    teams: Array<ITeam>;
    resp: any;
  
  @ViewChild("dt") dt : DataTable;
  

    constructor(private fb: FormBuilder, private teamService: TeamService) {
      this.teamForm = this.fb.group({
        name:  ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]]
        });
    }

 
    ngOnInit() {
  
      this.teamService.getTeams().
      do(res => console.log(res)).
      subscribe( res => { this.teams = res;});
    }

    updateTeams() {
      this.teamService.getTeams().
      do(res => console.log(res)).
      subscribe( res => { this.teams = res;});
    }

    save(): void {
      if (this.teamForm.dirty && this.teamForm.valid) {
        console.log('Attempting to Save: ' + JSON.stringify(this.teamForm.value))
        let t = Object.assign({}, this.team, this.teamForm.value);
        this.teamService.saveTeam(t)
          .subscribe(
             (r) => {console.log(`Successfully Saved Form: ${r.name}`);
                     this.resp = r.name;
                     this.updateTeams();
                     this.teamForm.reset();
                     this.showSuccess(r.name);
           },
               (e) => {  this.teamForm.reset(); this.showError(e);}

          );
      }  else {
          // Remember, you only save a "valid" form
          console.log("Form not dirty and valid")
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
    this.teamForm.reset();
}

}
