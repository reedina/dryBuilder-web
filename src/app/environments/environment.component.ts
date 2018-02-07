import { Component, OnInit } from '@angular/core';
import { MenuItem, DataTable, LazyLoadEvent } from "primeng/primeng";
import { FormBuilder, FormGroup, Validators, AbstractControl } from "@angular/forms";

import {Observable} from 'rxjs/Rx';
import { EnvironmentService } from './environment.service';
import { IEnvironment, Environment } from './environment';
import {Message} from 'primeng/primeng';
import {SelectItem} from 'primeng/primeng';

@Component({
  selector: 'app-environment',
  templateUrl: './environment.component.html',
  styleUrls: ['./environment.component.css']
})
export class EnvironmentComponent implements OnInit {
  
  selectButton: SelectItem[];
  msgs: Message[] = [];
  environmentForm: FormGroup;
  environment: Environment = new Environment()
  resp: any;
  environments: Array<IEnvironment>;
  
    constructor(private fb: FormBuilder, private environmentService: EnvironmentService) {

      this.environmentForm = this.fb.group({
        name:  ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        type:  ['',[Validators.required]],
        url:  ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]]           
        });

        this.initSelectButton();
     }
  

     initSelectButton() {
      this.selectButton = [];
      this.selectButton.push({label:'QA', value:'qa'});
      this.selectButton.push({label:'Staging', value:'staging'});
      this.selectButton.push({label:'Production', value:'production'});

     }


    ngOnInit() {
  
      this.environmentService.getEnvironments().
       do(res => console.log(res)).
       subscribe( res => { this.environments = res });
  
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
      this.environmentForm.reset();
  }

  updateEnvironments() {
    this.environmentService.getEnvironments().
    do(res => console.log(res)).
    subscribe( res => { this.environments = res });
  }

  save(): void {
    if (this.environmentForm.dirty && this.environmentForm.valid) {
      console.log('Attempting to Save: ' + JSON.stringify(this.environmentForm.value))
      let t = Object.assign({}, this.environment, this.environmentForm.value);
      this.environmentService.saveEnvironment(t)
        .subscribe(
           (r) => {console.log(`Successfully Saved Form: ${r.name}`);
                   this.resp = r.name;
                   this.updateEnvironments();
                   this.environmentForm.reset();
                   this.showSuccess(r.name);
         },
             (e) => {  this.environmentForm.reset(); this.showError(e);}
  
        );
    }  else {
        // Remember, you only save a "valid" form
        console.log("Form not dirty and valid")
    }
  
  }
}
