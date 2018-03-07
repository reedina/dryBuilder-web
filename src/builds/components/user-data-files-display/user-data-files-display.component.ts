import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit, AfterViewChecked, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserDataFile, UserDataFileClass } from '../../models/user-data-file.model';
import { MenuItem, DataTable, LazyLoadEvent, ButtonModule } from 'primeng/primeng';
import {TooltipModule} from 'primeng/tooltip';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import {Message} from 'primeng/primeng';
import { _ } from 'underscore';


@Component({
  selector: 'app-user-data-files-display',
  styleUrls:  ['user-data-files-display.component.css'],
  templateUrl: 'user-data-files-display.component.html',
  providers: [ConfirmationService]
})
export class UserDataFilesDisplayComponent implements OnChanges {

  userDataFile: UserDataFile =  new UserDataFileClass();

  @Input() userDataFiles: UserDataFile[];
  @Output() create = new EventEmitter<UserDataFile>();
  @Output() updateUserDataFile = new EventEmitter<UserDataFile>();
  @Output() remove = new EventEmitter<UserDataFile>();
  @Input() userDataFileEdit: UserDataFile;

  userDataFileForm: FormGroup;
  userDataFileEditForm: FormGroup;


  msgs: Message[] = [];

  @ViewChild('myanchor') myanchor;

  constructor(private fb: FormBuilder, private confirmationService: ConfirmationService,
    private router: Router, private route: ActivatedRoute) {

    this.userDataFileForm = this.fb.group({
      name:  ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      description:  ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      tags:  ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      source_code:  ['', [Validators.required]],

      });

      this.userDataFileEditForm = this.fb.group({
        id:  ['',  [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        name:  ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        description:  ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        tags:  ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        source_code:  ['', [Validators.required]],
        });
    }


    ngOnChanges(changes: SimpleChanges) {
        if (changes['userDataFiles'] ) {
            const chng = changes['userDataFiles'];
            const cur  = chng.currentValue;
            const prev = chng.previousValue;
            const curLength = (cur == null) ? 0 : cur.length;
            const prevLength = (prev == null) ? 0 : prev.length;

            if (curLength > 1 && (curLength - prevLength) === 1) {
                const newElement = _.difference(cur, prev);
                this.showSuccess('Added', newElement[0].name);
            }
            if (curLength > 1 && (curLength - prevLength) === 0) {
                const changedElement = _.difference(cur, prev);
                if (changedElement.length === 1) {   // Silly hack to fix issue;  Move to Store
                    this.showSuccess('Updated', changedElement[0].name);
                }
            }
        }
         if (changes['userDataFileEdit']) {
            const chngEdit = changes['userDataFileEdit'];
             let curEdit  = chngEdit.currentValue;
             if (curEdit === undefined ) { curEdit = { id: '', name: '', description: '', source_code: '', tags: ''}; }
                this.userDataFileEditForm.setValue({
                        id: curEdit['id'],
                        name: curEdit['name'],
                        description: curEdit['description'],
                        source_code: curEdit['source_code'],
                        tags: curEdit['tags']
                });
         }

    }

    confirm1(user_data_file_id) {
        this.router.navigate(['/builds/packer/ami/user-data-files'], { queryParams:  {edit: user_data_file_id}} );
    }

    confirm2(user_data_file) {
      this.confirmationService.confirm({
          message: `Do you want to delete: <b> ${user_data_file.name} </b>`,
          header: 'Delete Confirmation',
          icon: 'fa fa-trash',
          accept: () => {
              this.msgs = [{severity: 'error', summary: 'Confirmed', detail: `Deleting: <b>${user_data_file.name}</b>`}];
              this.router.navigate(['/builds/packer/ami/user-data-files' ]);
              this.remove.emit(user_data_file);
          },
          reject: () => {
              this.msgs = [{severity: 'info', summary: 'Cancelled', detail: `Not Deleting: <b>${user_data_file.name}</b>`}];
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
    this.userDataFileForm.reset();
  }
  onResetEdit() {
    this.userDataFileEditForm.reset();
    this.router.navigate(['/builds/packer/ami/user-data-files' ]);
  }
  save(): void {
    if (this.userDataFileForm.dirty && this.userDataFileForm.valid) {
        console.log('Attempting to Save: ' + JSON.stringify(this.userDataFileForm.value));
        const t = Object.assign({}, this.userDataFile, this.userDataFileForm.value);
        this.userDataFileForm.reset();
        this.create.emit(t);
    }  else {
        // Remember, you only save a "valid" form
        console.log('Form not dirty and valid');
    }
  }

  update(): void {
    if (this.userDataFileEditForm.dirty && this.userDataFileEditForm.valid) {
        console.log('Attempting to Update: ' + JSON.stringify(this.userDataFileEditForm.value));
        const t = Object.assign({}, this.userDataFile, this.userDataFileEditForm.value);
        this.userDataFileEditForm.reset();
        this.router.navigate(['/builds/packer/ami/user-data-files' ]);
        this.updateUserDataFile.emit(t);
    }  else {
        // Remember, you only save a "valid" form
        console.log('Edit Form not dirty and valid');
    }
  }
}
