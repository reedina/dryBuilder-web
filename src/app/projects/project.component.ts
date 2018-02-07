import { Component, OnInit } from '@angular/core';
import { MenuItem, DataTable, LazyLoadEvent } from "primeng/primeng";
import { FormBuilder, FormGroup, Validators, AbstractControl } from "@angular/forms";

import {Observable} from 'rxjs/Rx';
import { ProjectService } from './project.service';
import { IProject, Project} from './project';
import { TeamService } from '../teams/team.service';
import { ITeam, Team } from '../teams/team';
import {Message} from 'primeng/primeng';



@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  teamsDd =  [];
  msgs: Message[] = [];
  projectForm: FormGroup;
  project: Project = new Project();
  projects: Array<IProject>;
  teams: Array<ITeam>;  
  resp: any;

  constructor(private fb: FormBuilder, private projectService: ProjectService, private teamService: TeamService) {
    this.projectForm = this.fb.group({
      name:  ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      team: ['',[Validators.required]]      
     
      });
   }

  ngOnInit() {
    this.projectService.getProjects().
    do(res => console.log(res)).
    subscribe( res => { this.projects = res });  

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
  this.projectForm.reset();
}

updateProjects() {
  this.projectService.getProjects().
  do(res => console.log(res)).
  subscribe( res => { this.projects = res });
}

save(): void {
  if (this.projectForm.dirty && this.projectForm.valid) {
    console.log('Attempting to Save: ' + JSON.stringify(this.projectForm.value))
    let t = Object.assign({}, this.project, this.projectForm.value);
    this.projectService.saveProject(t)
      .subscribe(
         (r) => {console.log(`Successfully Saved Form: ${r.name}`);
                 this.resp = r.name;
                 this.updateProjects();
                 this.projectForm.reset();
                 this.showSuccess(r.name);
       },
           (e) => {  this.projectForm.reset(); this.showError(e);}

      );
  }  else {
      // Remember, you only save a "valid" form
      console.log("Form not dirty and valid")
  }

}
}
