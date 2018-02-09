import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { AwsRegion, AwsRegionClass } from '../../models/aws-region.model';
import { FormStatus, FormStatusClass } from '../../models/form-status.model';
import { MenuItem, DataTable, LazyLoadEvent } from 'primeng/primeng';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import {Message} from 'primeng/primeng';


@Component({
  selector: 'app-aws-regions-display',
  styleUrls:  ['aws-regions-display.component.css'],
  templateUrl: 'aws-regions-display.component.html'
})
export class AwsRegionsDisplayComponent implements OnChanges, OnInit {

  awsRegion: AwsRegion =  new AwsRegionClass();

  @Input() awsRegions: AwsRegion[];
  @Output() create = new EventEmitter<AwsRegion>();

  awsRegionForm: FormGroup;

  @Input() formSubmittedStatus: FormStatus;
  msgs: Message[] = [];


  constructor(private fb: FormBuilder) {
    this.awsRegionForm = this.fb.group({
      name:  ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      region:  ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      endpoint:  ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],

      });
    }

    ngOnInit() {
      this.formSubmittedStatus = new FormStatusClass();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['formSubmittedStatus'] ) {
            const chng = changes['formSubmittedStatus'];
            const cur  = chng.currentValue;
               if ( cur.submitted && cur.success) {
                    this.showSuccess("winner");
               } else if ( cur.submitted && cur.failed) {
                   this.showError("bad");
               }
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

  truncate(string: string) {
      if (string.length > 10) {
        return string.substring(0, 10) + '...';
      } else {
        return string;
      }
  }

  onReset() {
    this.awsRegionForm.reset();
  }

  save(): void {
    if (this.awsRegionForm.dirty && this.awsRegionForm.valid) {
      console.log('Attempting to Save: ' + JSON.stringify(this.awsRegionForm.value));
      const t = Object.assign({}, this.awsRegion, this.awsRegionForm.value);
      this.awsRegionForm.reset();
      this.create.emit(t);
      /*
      this.environmentInstanceService.saveEnvironmentInstance(t)
        .subscribe(
           (r) => {console.log(`Successfully Saved Form: ${r.name}`);
                   this.resp = r.name;
                   this.updateEnvironmentInstances();
                   this.environmentInstanceForm.reset();
                   this.showSuccess(r.name);
         },
             (e) => {  this.environmentInstanceForm.reset(); this.showError(e);}
        );*/
    }  else {
        // Remember, you only save a "valid" form
        console.log('Form not dirty and valid');
    }
  }
}
