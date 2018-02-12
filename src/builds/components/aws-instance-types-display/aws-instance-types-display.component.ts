import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit, AfterViewChecked, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AwsInstanceType, AwsInstanceTypeClass } from '../../models/aws-instance-type.model';
import { MenuItem, DataTable, LazyLoadEvent, ButtonModule } from 'primeng/primeng';
import {TooltipModule} from 'primeng/tooltip';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {SpinnerModule} from 'primeng/spinner';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import {Message} from 'primeng/primeng';
import { _ } from 'underscore';


@Component({
  selector: 'app-aws-instance-types-display',
  styleUrls:  ['aws-instance-types-display.component.css'],
  templateUrl: 'aws-instance-types-display.component.html',
  providers: [ConfirmationService]
})
export class AwsInstanceTypesDisplayComponent implements OnChanges {

  awsInstanceType: AwsInstanceType =  new AwsInstanceTypeClass();

  @Input() awsInstanceTypes: AwsInstanceType[];
  @Output() create = new EventEmitter<AwsInstanceType>();
  @Output() updateAwsInstanceType = new EventEmitter<AwsInstanceType>();
  @Output() remove = new EventEmitter<AwsInstanceType>();
  @Input() awsInstanceTypeEdit: AwsInstanceType;

  awsInstanceTypeForm: FormGroup;
  awsInstanceTypeEditForm: FormGroup;

  msgs: Message[] = [];

  @ViewChild('myanchor') myanchor;

  constructor(private fb: FormBuilder, private confirmationService: ConfirmationService,
    private router: Router, private route: ActivatedRoute) {

    this.awsInstanceTypeForm = this.fb.group({
      category:  ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      type:  ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      vcpu:  ['', [Validators.required, Validators.min(1), Validators.max(50) ]],
      memory_gb:  ['', [Validators.required, Validators.min(1), Validators.max(50)]],
      });

      this.awsInstanceTypeEditForm = this.fb.group({
        id:  ['',  [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        category:  ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        type:  ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        vcpu:  ['', [Validators.required, Validators.min(1), Validators.max(50)]],
        memory_gb:  ['', [Validators.required, Validators.min(1), Validators.max(50)]],
        });
    }


    ngOnChanges(changes: SimpleChanges) {
        if (changes['awsInstanceTypes'] ) {
            const chng = changes['awsInstanceTypes'];
            const cur  = chng.currentValue;
            const prev = chng.previousValue;
            const curLength = (cur == null) ? 0 : cur.length;
            const prevLength = (prev == null) ? 0 : prev.length;

            if ((curLength - prevLength) === 1) {
                const newElement = _.difference(cur, prev);
                this.showSuccess('Added', newElement[0].type);
            }
            if (curLength > 1 && (curLength - prevLength) === 0) {
                const changedElement = _.difference(cur, prev);
                if (changedElement.length === 1) {   // Silly hack to fix issue;  Move to Store
                    this.showSuccess('Updated', changedElement[0].type);
                }
            }
        }
         if (changes['awsInstanceTypeEdit']) {
            const chngEdit = changes['awsInstanceTypeEdit'];
             let curEdit  = chngEdit.currentValue;
             if (curEdit === undefined ) { curEdit = { id: '', category: '', type: '', vcpu: '', memory_gb: '' }; }
                this.awsInstanceTypeEditForm.setValue({
                        id: curEdit['id'],
                        category: curEdit['category'],
                        type: curEdit['type'],
                        vcpu: curEdit['vcpu'],
                        memory_gb: curEdit['memory_gb']
                });
         }

    }

    confirm1(instance_type_id) {
        this.router.navigate(['/builds/aws/instance-types'], { queryParams:  {edit: instance_type_id}} );
    }

    confirm2(instance_type) {
      this.confirmationService.confirm({
          message: `Do you want to delete: <b> ${instance_type.type} </b>`,
          header: 'Delete Confirmation',
          icon: 'fa fa-trash',
          accept: () => {
              this.msgs = [{severity: 'error', summary: 'Confirmed', detail: `Deleting: <b>${instance_type.type}</b>`}];
              this.router.navigate(['/builds/aws/instance-types' ]);
              this.remove.emit(instance_type);
          },
          reject: () => {
              this.msgs = [{severity: 'info', summary: 'Cancelled', detail: `Not Deleting: <b>${instance_type.type}</b>`}];
          }
      });
  }
  showError(message: string) {
    this.msgs = [];
    this.msgs.push({severity: 'error', summary: 'Error Message', detail: message});
  }

  showSuccess(type: string, name: string) {
    this.msgs = [];
    this.msgs.push({severity: 'success', summary: 'Success', detail: `${type}: ${this.truncate(name)}`});
  }

  truncate(string: string) {
      if (string.length > 15) {
        return string.substring(0, 15) + '...';
      } else {
        return string;
      }
  }

  onReset() {
    this.awsInstanceTypeForm.reset();
  }
  onResetEdit() {
    this.awsInstanceTypeEditForm.reset();
    this.router.navigate(['/builds/aws/instance-types' ]);
  }
  save(): void {
    if (this.awsInstanceTypeForm.dirty && this.awsInstanceTypeForm.valid) {
        console.log('Attempting to Save: ' + JSON.stringify(this.awsInstanceTypeForm.value));
        const t = Object.assign({}, this.awsInstanceType, this.awsInstanceTypeForm.value);
        this.awsInstanceTypeForm.reset();
        this.create.emit(t);
    }  else {
        // Remember, you only save a "valid" form
        console.log('Form not dirty and valid');
    }
  }

  update(): void {
    if (this.awsInstanceTypeEditForm.dirty && this.awsInstanceTypeEditForm.valid) {
        console.log('Attempting to Update: ' + JSON.stringify(this.awsInstanceTypeEditForm.value));
        const t = Object.assign({}, this.awsInstanceType, this.awsInstanceTypeEditForm.value);
        this.awsInstanceTypeEditForm.reset();
        this.router.navigate(['/builds/aws/instance-types' ]);
        this.updateAwsInstanceType.emit(t);
    }  else {
        // Remember, you only save a "valid" form
        console.log('Edit Form not dirty and valid');
    }
  }
}
