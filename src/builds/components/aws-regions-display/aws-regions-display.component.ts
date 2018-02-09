import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { AwsRegion, AwsRegionClass } from '../../models/aws-region.model';
import { MenuItem, DataTable, LazyLoadEvent } from 'primeng/primeng';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import {Message} from 'primeng/primeng';
import { _ } from 'underscore';


@Component({
  selector: 'app-aws-regions-display',
  styleUrls:  ['aws-regions-display.component.css'],
  templateUrl: 'aws-regions-display.component.html'
})
export class AwsRegionsDisplayComponent implements OnChanges {

  awsRegion: AwsRegion =  new AwsRegionClass();

  @Input() awsRegions: AwsRegion[];
  @Output() create = new EventEmitter<AwsRegion>();

  awsRegionForm: FormGroup;

  msgs: Message[] = [];


  constructor(private fb: FormBuilder) {
    this.awsRegionForm = this.fb.group({
      name:  ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      region:  ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      endpoint:  ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],

      });
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['awsRegions'] ) {
            const chng = changes['awsRegions'];
            const cur  = chng.currentValue;
            const prev = chng.previousValue;
            const curLength = (cur == null) ? 0 : cur.length;
            const prevLength = (prev == null) ? 0 : prev.length;

            if ((curLength - prevLength) === 1) {
                const newElement = _.difference(cur, prev);
                this.showSuccess(newElement[0].region);
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
    }  else {
        // Remember, you only save a "valid" form
        console.log('Form not dirty and valid');
    }
  }
}
