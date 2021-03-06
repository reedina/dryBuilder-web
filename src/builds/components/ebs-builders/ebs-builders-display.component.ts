import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit, AfterViewChecked, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EbsBuilder, EbsBuilderClass } from '../../models/ebs-builder.model';
import { MenuItem, DataTable, LazyLoadEvent, ButtonModule } from 'primeng/primeng';
import {TooltipModule} from 'primeng/tooltip';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {SpinnerModule} from 'primeng/spinner';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import {Message} from 'primeng/primeng';
import {TableModule} from 'primeng/table';
import { _ } from 'underscore';


export interface Car {
    vin;
    year;
    brand;
    color;
}

@Component({
  selector: 'app-ebs-builders-display',
  styleUrls:  ['ebs-builders-display.component.css'],
  templateUrl: 'ebs-builders-display.component.html',
  providers: [ConfirmationService]
})
export class EbsBuildersDisplayComponent implements OnChanges {

    cars: Car[] = [{ vin: 'asdf',  year: 1012, brand: 'sdfsd', color: 'sdfsd' }];

    add_ssh_username: boolean;
    edit_ssh_username: boolean;
    add_ami_description: boolean;
    edit_ami_description: boolean;

  ebsBuilder: EbsBuilder =  new EbsBuilderClass();

  @Input() ebsBuilders: EbsBuilder[];
  @Output() create = new EventEmitter<EbsBuilder>();
  @Output() updateEbsBuilder = new EventEmitter<EbsBuilder>();
  @Output() remove = new EventEmitter<EbsBuilder>();
  @Input() ebsBuilderEdit: EbsBuilder;
  @Input() ebsBuilderClone: EbsBuilder;
  @Input() awsAuthSelectList: any;
  @Input() awsRegionSelectList: any;
  @Input() awsInstanceTypeSelectList: any;
  @Input() amiFilterLinuxSelectList: any;

  ebsBuilderForm: FormGroup;
  ebsBuilderEditForm: FormGroup;

  msgs: Message[] = [];

  @ViewChild('myanchor') myanchor;

  constructor(private fb: FormBuilder, private confirmationService: ConfirmationService,
    private router: Router, private route: ActivatedRoute) {

    this.ebsBuilderForm = this.fb.group({
      builder_name:  ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      ami_name:  ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      aws_auth_id:  ['', [Validators.required]],
      aws_regions_id:  ['', [Validators.required]],
      aws_instance_types_id:  ['', [Validators.required]],
      aws_src_ami_filter_linux_id:  ['', [Validators.required]],
      ssh_username:  [''],
      ami_description: [''],
      });

      this.ebsBuilderEditForm = this.fb.group({
        id:  ['',  [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        builder_name:  ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        ami_name:  ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        aws_auth_id:  ['', [Validators.required]],
        aws_regions_id:  ['', [Validators.required]],
        aws_instance_types_id:  ['', [Validators.required]],
        aws_src_ami_filter_linux_id:  ['', [Validators.required]],
        ssh_username:  [''],
        ami_description: [''],
        });
    }


    ngOnChanges(changes: SimpleChanges) {
        if (changes['ebsBuilders'] ) {
            const chng = changes['ebsBuilders'];
            const cur  = chng.currentValue;
            const prev = chng.previousValue;
            const firstChng = chng.firstChange;
            const curLength = (cur == null) ? 0 : cur.length;
            const prevLength = (prev == null) ? 0 : prev.length;

            if (curLength > 1 && (curLength - prevLength) === 1) {
                const newElement = _.difference(cur, prev);
                this.showSuccess('Added', newElement[0].builder_name);
            }
            if (curLength > 1 && (curLength - prevLength) === 0) {
                const changedElement = _.difference(cur, prev);
                if (changedElement.length === 1) {   // Silly hack to fix issue;  Move to Store
                    this.showSuccess('Updated', changedElement[0].builder_name);
                }
            }
        }
         if (changes['ebsBuilderEdit']) {
            const chngEdit = changes['ebsBuilderEdit'];
             let curEdit  = chngEdit.currentValue;
             if (curEdit === undefined ) { curEdit = { id: '', builder_name: '', ami_name: '', aws_auth_id: '', aws_regions_id: '',
                    aws_instance_types_id: '', aws_src_ami_filter_linux_id: '', ssh_username: '', ami_description: ''}; }

                this.enable_optional(curEdit['ssh_username'], 'edit_ssh_username');
                this.enable_optional(curEdit['ami_description'], 'edit_ami_description');

                this.ebsBuilderEditForm.setValue({
                        id: curEdit['id'],
                        builder_name: curEdit['builder_name'],
                        ami_name: curEdit['ami_name'],
                        aws_auth_id: curEdit['aws_auth_id'],
                        aws_regions_id: curEdit['aws_regions_id'],
                        aws_instance_types_id: curEdit['aws_instance_types_id'],
                        aws_src_ami_filter_linux_id: curEdit['aws_src_ami_filter_linux_id'],
                        ssh_username: curEdit['ssh_username'],
                        ami_description: curEdit['ami_description'],
                });
         }
         if (changes['ebsBuilderClone']) {
            const chngEdit = changes['ebsBuilderClone'];
             let curEdit  = chngEdit.currentValue;
             if (curEdit === undefined ) { curEdit = { id: '', builder_name: '', ami_name: '', aws_auth_id: '', aws_regions_id: '',
             aws_instance_types_id: '', aws_src_ami_filter_linux_id: '', ssh_username: '', ami_description: ''}; }

                this.enable_optional(curEdit['ssh_username'], 'add_ssh_username');
                this.enable_optional(curEdit['ami_description'], 'add_ami_description');

                this.ebsBuilderForm.setValue({
                    builder_name: curEdit['builder_name'],
                    ami_name: curEdit['ami_name'],
                    aws_auth_id: curEdit['aws_auth_id'],
                    aws_regions_id: curEdit['aws_regions_id'],
                    aws_instance_types_id: curEdit['aws_instance_types_id'],
                    aws_src_ami_filter_linux_id: curEdit['aws_src_ami_filter_linux_id'],
                    ssh_username: curEdit['ssh_username'],
                    ami_description: curEdit['ami_description'],
                });
         }

    }

    confirm1(ebs_id) {
        this.add_ssh_username = false;
        this.edit_ssh_username = false;
        this.router.navigate(['/builds/packer/builder/ebs'], { queryParams:  {edit: ebs_id}} );
    }

    confirm2(ebs) {
      this.confirmationService.confirm({
          message: `Do you want to delete: <b> ${ebs.builder_name} </b>`,
          header: 'Delete Confirmation',
          icon: 'fa fa-trash',
          accept: () => {
              this.msgs = [{severity: 'error', summary: 'Confirmed', detail: `Deleting: <b>${ebs.builder_name}</b>`}];
              this.add_ssh_username = false;
              this.edit_ssh_username = false;
              this.router.navigate(['/builds/packer/builder/ebs' ]);
              this.remove.emit(ebs);
          },
          reject: () => {
              this.msgs = [{severity: 'info', summary: 'Cancelled', detail: `Not Deleting: <b>${ebs.builder_name}</b>`}];
          }
      });
  }
  confirm3(ebs_id) {
    this.add_ssh_username = false;
    this.edit_ssh_username = false;
    this.router.navigate(['/builds/packer/builder/ebs'], { queryParams:  {clone: ebs_id}} );
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
    this.ebsBuilderForm.reset();
    this.router.navigate(['/builds/packer/builder/ebs' ]);
    this.add_ssh_username = false;
    this.add_ami_description = false;
  }
  onResetEdit() {
    this.ebsBuilderEditForm.reset();
    this.router.navigate(['/builds/packer/builder/ebs' ]);
    this.edit_ssh_username = false;
    this.edit_ami_description = false;
  }
  save(): void {

    if (this.ebsBuilderForm.dirty && this.ebsBuilderForm.valid) {
        console.log('Attempting to Save: ' + JSON.stringify(this.ebsBuilderForm.value));
        const t = Object.assign({}, this.ebsBuilder, this.ebsBuilderForm.value);
        this.ebsBuilderForm.reset();
        this.router.navigate(['/builds/packer/builder/ebs' ]);
        this.add_ssh_username = false;
        this.edit_ssh_username = false;
        this.add_ami_description = false;
        this.edit_ami_description = false;
        this.create.emit(t);
    }  else {
        // Remember, you only save a "valid" form
        console.log('Form not dirty and valid');
    }
  }

  update(): void {

    if (this.ebsBuilderEditForm.dirty && this.ebsBuilderEditForm.valid) {
        console.log('Attempting to Update: ' + JSON.stringify(this.ebsBuilderEditForm.value));
        const t = Object.assign({}, this.ebsBuilder, this.ebsBuilderEditForm.value);
        this.ebsBuilderEditForm.reset();
        this.router.navigate(['/builds/packer/builder/ebs' ]);
        this.add_ssh_username = false;
        this.edit_ssh_username = false;
        this.add_ami_description = false;
        this.edit_ami_description = false;
        this.updateEbsBuilder.emit(t);
    }  else {
        // Remember, you only save a "valid" form
        console.log('Edit Form not dirty and valid');
    }
  }

  isBlank(str) {
      if (str === null || str.length === 0 || str === ' ')  {
          return true;
      }
      return false;
    }

    enable_optional(checkEmpty, enable_field) {
      const value = this.isBlank(checkEmpty);
      if (!value) {
          this[enable_field] = true;
      }
    }
}
