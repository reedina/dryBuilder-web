import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit, AfterViewChecked, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AmiFilterLinux, AmiFilterLinuxClass } from '../../models/packer-ami-filter-linux.model';
import { MenuItem, DataTable, LazyLoadEvent, ButtonModule } from 'primeng/primeng';
import {TooltipModule} from 'primeng/tooltip';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {SpinnerModule} from 'primeng/spinner';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import {Message} from 'primeng/primeng';
import { _ } from 'underscore';


@Component({
  selector: 'app-ami-filter-linuxes-display',
  styleUrls:  ['packer-ami-filter-linuxes-display.component.css'],
  templateUrl: 'packer-ami-filter-linuxes-display.component.html',
  providers: [ConfirmationService]
})
export class AmiFilterLinuxsDisplayComponent implements OnChanges {

  amiFilterLinux: AmiFilterLinux =  new AmiFilterLinuxClass();

  @Input() amiFilterLinuxes: AmiFilterLinux[];
  @Output() create = new EventEmitter<AmiFilterLinux>();
  @Output() updateAmiFilterLinux = new EventEmitter<AmiFilterLinux>();
  @Output() remove = new EventEmitter<AmiFilterLinux>();
  @Input() amiFilterLinuxEdit: AmiFilterLinux;
  @Input() amiFilterLinuxClone: AmiFilterLinux;
  @Input() builderTypesSelectList: any;

  amiFilterLinuxForm: FormGroup;
  amiFilterLinuxEditForm: FormGroup;

  msgs: Message[] = [];

  @ViewChild('myanchor') myanchor;

  constructor(private fb: FormBuilder, private confirmationService: ConfirmationService,
    private router: Router, private route: ActivatedRoute) {

    this.amiFilterLinuxForm = this.fb.group({
      builder_types_id:  ['', [Validators.required]],
      friendly_name:  ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      description:  ['', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
      ssh_username:  ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      virtualization_type:  ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      name:  ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      root_device_type:  ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      most_recent:  ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      owners:  ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]]
      });

      this.amiFilterLinuxEditForm = this.fb.group({
        id:  ['',  [Validators.required, Validators.min(3), Validators.maxLength(50)]],
        builder_types_id:  ['', [Validators.required]],
        friendly_name:  ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        description:  ['', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
        ssh_username:  ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        virtualization_type:  ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        name:  ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
        root_device_type:  ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        most_recent:  ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
        owners:  ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]]
        });
    }


    ngOnChanges(changes: SimpleChanges) {
        if (changes['amiFilterLinuxes'] ) {
            const chng = changes['amiFilterLinuxes'];
            const cur  = chng.currentValue;
            const prev = chng.previousValue;
            const curLength = (cur == null) ? 0 : cur.length;
            const prevLength = (prev == null) ? 0 : prev.length;

            if (curLength > 1 && (curLength - prevLength) === 1) {
                const newElement = _.difference(cur, prev);
                this.showSuccess('Added', newElement[0].friendly_name);
            }
            if (curLength > 1 && (curLength - prevLength) === 0) {
                const changedElement = _.difference(cur, prev);
                if (changedElement.length === 1) {   // Silly hack to fix issue;  Move to Store
                    this.showSuccess('Updated', changedElement[0].friendly_name);
                }
            }
        }
         if (changes['amiFilterLinuxEdit']) {
            const chngEdit = changes['amiFilterLinuxEdit'];
             let curEdit  = chngEdit.currentValue;
             if (curEdit === undefined ) { curEdit = { id: '', builder_types_id: '', friendly_name: '', description: '',
                            ssh_username: '', virtualization_type: '', name: '', root_device_type: '', most_recent: '',
                             owners: ''}; }
                this.amiFilterLinuxEditForm.setValue({
                        id: curEdit['id'],
                        builder_types_id: curEdit['builder_types_id'],
                        friendly_name: curEdit['friendly_name'],
                        description: curEdit['description'],
                        ssh_username: curEdit['ssh_username'],
                        virtualization_type: curEdit['virtualization_type'],
                        name: curEdit['name'],
                        root_device_type: curEdit['root_device_type'],
                        most_recent: curEdit['most_recent'],
                        owners: curEdit['owners']
                });
         }

         if (changes['amiFilterLinuxClone']) {
            const chngEdit = changes['amiFilterLinuxClone'];
             let curEdit  = chngEdit.currentValue;
             if (curEdit === undefined ) { curEdit = {  builder_types_id: '', friendly_name: '', description: '',
                            ssh_username: '', virtualization_type: '', name: '', root_device_type: '', most_recent: '',
                             owners: ''}; }
                this.amiFilterLinuxForm.setValue({
                        builder_types_id:   curEdit['builder_types_id'],
                        friendly_name: curEdit['friendly_name'],
                        description: curEdit['description'],
                        ssh_username: curEdit['ssh_username'],
                        virtualization_type: curEdit['virtualization_type'],
                        name: curEdit['name'],
                        root_device_type: curEdit['root_device_type'],
                        most_recent: curEdit['most_recent'],
                        owners: curEdit['owners']
                });
         }

    }

    confirm1(ami_filter_linux_id) {
        this.router.navigate(['/builds/packer/ami/filter/linuxes'], { queryParams:  {edit: ami_filter_linux_id}} );
    }

    confirm2(ami_filter_linux) {
      this.confirmationService.confirm({
          message: `Do you want to delete: <b> ${ami_filter_linux.friendly_name} </b>`,
          header: 'Delete Confirmation',
          icon: 'fa fa-trash',
          accept: () => {
              this.msgs = [{severity: 'error', summary: 'Confirmed', detail: `Deleting: <b>${ami_filter_linux.friendly_name}</b>`}];
              this.router.navigate(['/builds/packer/ami/filter/linuxes' ]);
              this.remove.emit(ami_filter_linux);
          },
          reject: () => {
              this.msgs = [{severity: 'info', summary: 'Cancelled', detail: `Not Deleting: <b>${ami_filter_linux.friendly_name}</b>`}];
          }
      });
  }

  confirm3(ami_filter_linux_id) {
    this.router.navigate(['/builds/packer/ami/filter/linuxes'], { queryParams:  {clone: ami_filter_linux_id}} );
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
    this.amiFilterLinuxForm.reset();
    this.router.navigate(['/builds/packer/ami/filter/linuxes' ]);
  }
  onResetEdit() {
    this.amiFilterLinuxEditForm.reset();
    this.router.navigate(['/builds/packer/ami/filter/linuxes' ]);
  }
  save(): void {
    if (this.amiFilterLinuxForm.dirty && this.amiFilterLinuxForm.valid) {
        console.log('Attempting to Save: ' + JSON.stringify(this.amiFilterLinuxForm.value));
        const t = Object.assign({}, this.amiFilterLinux, this.amiFilterLinuxForm.value);
        this.amiFilterLinuxForm.reset();
        console.log(t);
        this.create.emit(t);
    }  else {
        // Remember, you only save a "valid" form
        console.log('Form not dirty and valid');
    }
  }

  update(): void {
    if (this.amiFilterLinuxEditForm.dirty && this.amiFilterLinuxEditForm.valid) {
        console.log('Attempting to Update: ' + JSON.stringify(this.amiFilterLinuxEditForm.value));
        const t = Object.assign({}, this.amiFilterLinux, this.amiFilterLinuxEditForm.value);
        this.amiFilterLinuxEditForm.reset();
        this.router.navigate(['/builds/packer/ami/filter/linuxes' ]);
        this.updateAmiFilterLinux.emit(t);
    }  else {
        // Remember, you only save a "valid" form
        console.log('Edit Form not dirty and valid');
    }
  }
}
