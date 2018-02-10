import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit, AfterViewChecked, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AwsRegion, AwsRegionClass } from '../../models/aws-region.model';
import { MenuItem, DataTable, LazyLoadEvent, ButtonModule } from 'primeng/primeng';
import {TooltipModule} from 'primeng/tooltip';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import {Message} from 'primeng/primeng';
import { _ } from 'underscore';


@Component({
  selector: 'app-aws-regions-display',
  styleUrls:  ['aws-regions-display.component.css'],
  templateUrl: 'aws-regions-display.component.html',
  providers: [ConfirmationService]
})
export class AwsRegionsDisplayComponent implements OnChanges {

  awsRegion: AwsRegion =  new AwsRegionClass();

  @Input() awsRegions: AwsRegion[];
  @Output() create = new EventEmitter<AwsRegion>();
  @Input() awsRegionEdit: AwsRegion;
 
  awsRegionForm: FormGroup;
  awsRegionEditForm: FormGroup;
  

  msgs: Message[] = [];

  @ViewChild('myanchor') myanchor;

  constructor(private fb: FormBuilder, private confirmationService: ConfirmationService,
    private router: Router, private route: ActivatedRoute) {

    this.awsRegionForm = this.fb.group({
      name:  ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      region:  ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      endpoint:  ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],

      });

      this.awsRegionEditForm = this.fb.group({
        id:  ['',  [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        name:  ['',  [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
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
         if (changes['awsRegionEdit']) {
            const chngEdit = changes['awsRegionEdit'];
             let curEdit  = chngEdit.currentValue;
             if (curEdit === undefined ) { curEdit = { id: '', name: '', region: '', endpoint: ''}; }
                this.onResetEdit();
                this.awsRegionEditForm.setValue({
                        id: curEdit['id'],
                        name: curEdit['name'],
                        region: curEdit['region'],
                        endpoint: curEdit['endpoint']
                });
         }

    }

    confirm1(region_id) {
        this.router.navigate(['/builds/aws/regions'], { queryParams:  {edit: region_id}} );
    }

    confirm2(region) {
      this.confirmationService.confirm({
          message: `Do you want to delete: <b> ${region} </b>`,
          header: 'Delete Confirmation',
          icon: 'fa fa-trash',
          accept: () => {
              this.msgs = [{severity:'error', summary:'Confirmed', detail:`Deleting: <b>${region}</b>`}];
              this.router.navigate(['/builds/aws/regions' ]);
          },
          reject: () => {
              this.msgs = [{severity:'info', summary:'Cancelled', detail:`Not Deleting: <b>${region}</b>`}];
          }
      });
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
  onResetEdit() {
    this.awsRegionEditForm.reset();
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

  update(): void {
    if (this.awsRegionEditForm.dirty && this.awsRegionEditForm.valid) {
        console.log('Attempting to Update: ' + JSON.stringify(this.awsRegionEditForm.value));
        const t = Object.assign({}, this.awsRegion, this.awsRegionEditForm.value);
        this.awsRegionEditForm.reset();
        console.log(t);
        //this.create.emit(t);
    }  else {
        // Remember, you only save a "valid" form
        console.log('Edit Form not dirty and valid');
    }
  }
}
