import { Component} from '@angular/core';
import { PackerTemplate } from '../../models/packer-template.model';
import { MenuItem, DataTable, LazyLoadEvent } from 'primeng/primeng';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import {Message} from 'primeng/primeng';


@Component({
  selector: 'app-aws-regions-display',
  styleUrls:  ['aws-regions-display.component.css'],
  templateUrl: 'aws-regions-display.component.html'
})
export class AwsRegionsDisplayComponent {

  environmentInstanceForm: FormGroup;
  
  constructor(private fb: FormBuilder) {
    this.environmentInstanceForm = this.fb.group({
      name:  ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      deletion_time:  ['', [Validators.required]],
      environment: ['', [Validators.required]],
      team: ['', [Validators.required]],
      project: ['', [Validators.required]]

      });

    }
  
}