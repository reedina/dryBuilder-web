import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit, AfterViewChecked, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PackerBuilderType, PackerBuilderTypeClass } from '../../models/packer-builder-type.model';
import { MenuItem, DataTable, LazyLoadEvent, ButtonModule } from 'primeng/primeng';
import {TooltipModule} from 'primeng/tooltip';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {SpinnerModule} from 'primeng/spinner';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import {Message} from 'primeng/primeng';
import { _ } from 'underscore';


@Component({
  selector: 'app-packer-builder-types-display',
  styleUrls:  ['packer-builder-types-display.component.css'],
  templateUrl: 'packer-builder-types-display.component.html',
  providers: [ConfirmationService]
})
export class PackerBuilderTypesDisplayComponent implements OnChanges {

  packerBuilderType: PackerBuilderType =  new PackerBuilderTypeClass();

  @Input() packerBuilderTypes: PackerBuilderType[];
  @Output() create = new EventEmitter<PackerBuilderType>();
  @Output() updatePackerBuilderType = new EventEmitter<PackerBuilderType>();
  @Output() remove = new EventEmitter<PackerBuilderType>();
  @Input() packerBuilderTypeEdit: PackerBuilderType;

  packerBuilderTypeForm: FormGroup;
  packerBuilderTypeEditForm: FormGroup;

  msgs: Message[] = [];

  @ViewChild('myanchor') myanchor;

  constructor(private fb: FormBuilder, private confirmationService: ConfirmationService,
    private router: Router, private route: ActivatedRoute) {

    this.packerBuilderTypeForm = this.fb.group({
      name:  ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      description:  ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      type:  ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      });

      this.packerBuilderTypeEditForm = this.fb.group({
        id:  ['',  [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        name:  ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        description:  ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        type:  ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        });
    }


    ngOnChanges(changes: SimpleChanges) {
        if (changes['packerBuilderTypes'] ) {
            const chng = changes['packerBuilderTypes'];
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
         if (changes['packerBuilderTypeEdit']) {
            const chngEdit = changes['packerBuilderTypeEdit'];
             let curEdit  = chngEdit.currentValue;
             if (curEdit === undefined ) { curEdit = { id: '', name: '', description: '', type: '' }; }
                this.packerBuilderTypeEditForm.setValue({
                        id: curEdit['id'],
                        name: curEdit['name'],
                        description: curEdit['description'],
                        type: curEdit['type']
                });
         }

    }

    confirm1(builder_type_id) {
        this.router.navigate(['/builds/packer/builder/types'], { queryParams:  {edit: builder_type_id}} );
    }

    confirm2(builder_type) {
      this.confirmationService.confirm({
          message: `Do you want to delete: <b> ${builder_type.type} </b>`,
          header: 'Delete Confirmation',
          icon: 'fa fa-trash',
          accept: () => {
              this.msgs = [{severity: 'error', summary: 'Confirmed', detail: `Deleting: <b>${builder_type.type}</b>`}];
              this.router.navigate(['/builds/packer/builder/types' ]);
              this.remove.emit(builder_type);
          },
          reject: () => {
              this.msgs = [{severity: 'info', summary: 'Cancelled', detail: `Not Deleting: <b>${builder_type.type}</b>`}];
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
    this.packerBuilderTypeForm.reset();
  }
  onResetEdit() {
    this.packerBuilderTypeEditForm.reset();
    this.router.navigate(['/builds/packer/builder/types' ]);
  }
  save(): void {
    if (this.packerBuilderTypeForm.dirty && this.packerBuilderTypeForm.valid) {
        console.log('Attempting to Save: ' + JSON.stringify(this.packerBuilderTypeForm.value));
        const t = Object.assign({}, this.packerBuilderType, this.packerBuilderTypeForm.value);
        this.packerBuilderTypeForm.reset();
        this.create.emit(t);
    }  else {
        // Remember, you only save a "valid" form
        console.log('Form not dirty and valid');
    }
  }

  update(): void {
    if (this.packerBuilderTypeEditForm.dirty && this.packerBuilderTypeEditForm.valid) {
        console.log('Attempting to Update: ' + JSON.stringify(this.packerBuilderTypeEditForm.value));
        const t = Object.assign({}, this.packerBuilderType, this.packerBuilderTypeEditForm.value);
        this.packerBuilderTypeEditForm.reset();
        this.router.navigate(['/builds/packer/builder/types' ]);
        this.updatePackerBuilderType.emit(t);
    }  else {
        // Remember, you only save a "valid" form
        console.log('Edit Form not dirty and valid');
    }
  }
}
