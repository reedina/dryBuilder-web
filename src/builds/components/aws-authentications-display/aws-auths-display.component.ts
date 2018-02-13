import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit, AfterViewChecked, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AwsAuth, AwsAuthClass } from '../../models/aws-auth.model';
import { MenuItem, DataTable, LazyLoadEvent, ButtonModule } from 'primeng/primeng';
import {TooltipModule} from 'primeng/tooltip';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {SpinnerModule} from 'primeng/spinner';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import {Message} from 'primeng/primeng';
import { _ } from 'underscore';


@Component({
  selector: 'app-aws-auths-display',
  styleUrls:  ['aws-auths-display.component.css'],
  templateUrl: 'aws-auths-display.component.html',
  providers: [ConfirmationService]
})
export class AwsAuthsDisplayComponent implements OnChanges {

  awsAuth: AwsAuth =  new AwsAuthClass();

  @Input() awsAuths: AwsAuth[];
  @Output() create = new EventEmitter<AwsAuth>();
  @Output() updateAwsAuth = new EventEmitter<AwsAuth>();
  @Output() remove = new EventEmitter<AwsAuth>();
  @Input() awsAuthEdit: AwsAuth;

  awsAuthForm: FormGroup;
  awsAuthEditForm: FormGroup;

  msgs: Message[] = [];

  @ViewChild('myanchor') myanchor;

  constructor(private fb: FormBuilder, private confirmationService: ConfirmationService,
    private router: Router, private route: ActivatedRoute) {

    this.awsAuthForm = this.fb.group({
      account_name:  ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      access_type:  ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      access_key_id:  ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50) ]],
      secret_key:  ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      });

      this.awsAuthEditForm = this.fb.group({
        id:  ['',  [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        account_name:  ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        access_type:  ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        access_key_id:  ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50) ]],
        secret_key:  ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        });
    }


    ngOnChanges(changes: SimpleChanges) {
        if (changes['awsAuths'] ) {
            const chng = changes['awsAuths'];
            const cur  = chng.currentValue;
            const prev = chng.previousValue;
            const curLength = (cur == null) ? 0 : cur.length;
            const prevLength = (prev == null) ? 0 : prev.length;

            if ((curLength - prevLength) === 1) {
                const newElement = _.difference(cur, prev);
                this.showSuccess('Added', newElement[0].account_name);
            }
            if (curLength > 1 && (curLength - prevLength) === 0) {
                const changedElement = _.difference(cur, prev);
                if (changedElement.length === 1) {   // Silly hack to fix issue;  Move to Store
                    this.showSuccess('Updated', changedElement[0].account_name);
                }
            }
        }
         if (changes['awsAuthEdit']) {
            const chngEdit = changes['awsAuthEdit'];
             let curEdit  = chngEdit.currentValue;
             if (curEdit === undefined ) { curEdit = { id: '', account_name: '', access_type: '', access_key_id: '', secret_key: '' }; }
                this.awsAuthEditForm.setValue({
                        id: curEdit['id'],
                        account_name: curEdit['account_name'],
                        access_type: curEdit['access_type'],
                        access_key_id: curEdit['access_key_id'],
                        secret_key: curEdit['secret_key']
                });
         }

    }

    confirm1(auth_id) {
        this.router.navigate(['/builds/aws/authentications'], { queryParams:  {edit: auth_id}} );
    }

    confirm2(auth) {
      this.confirmationService.confirm({
          message: `Do you want to delete: <b> ${auth.account_name} </b>`,
          header: 'Delete Confirmation',
          icon: 'fa fa-trash',
          accept: () => {
              this.msgs = [{severity: 'error', summary: 'Confirmed', detail: `Deleting: <b>${auth.acccount_name}</b>`}];
              this.router.navigate(['/builds/aws/authentications' ]);
              this.remove.emit(auth);
          },
          reject: () => {
              this.msgs = [{severity: 'info', summary: 'Cancelled', detail: `Not Deleting: <b>${auth.account_name}</b>`}];
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
    this.awsAuthForm.reset();
  }
  onResetEdit() {
    this.awsAuthEditForm.reset();
    this.router.navigate(['/builds/aws/authentications' ]);
  }
  save(): void {
    if (this.awsAuthForm.dirty && this.awsAuthForm.valid) {
        console.log('Attempting to Save: ' + JSON.stringify(this.awsAuthForm.value));
        const t = Object.assign({}, this.awsAuth, this.awsAuthForm.value);
        this.awsAuthForm.reset();
        this.create.emit(t);
    }  else {
        // Remember, you only save a "valid" form
        console.log('Form not dirty and valid');
    }
  }

  update(): void {
    if (this.awsAuthEditForm.dirty && this.awsAuthEditForm.valid) {
        console.log('Attempting to Update: ' + JSON.stringify(this.awsAuthEditForm.value));
        const t = Object.assign({}, this.awsAuth, this.awsAuthEditForm.value);
        this.awsAuthEditForm.reset();
        this.router.navigate(['/builds/aws/authentications' ]);
        this.updateAwsAuth.emit(t);
    }  else {
        // Remember, you only save a "valid" form
        console.log('Edit Form not dirty and valid');
    }
  }
}
