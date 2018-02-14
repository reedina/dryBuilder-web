import { PackerBuilderTypesService } from '../../services/packer-builder-types.service';
import { Component, OnInit } from '@angular/core';
import { PackerBuilderType } from '../../models/packer-builder-type.model';

import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import { Observable } from 'rxjs/Observable';

@Component({
  styleUrls: ['packer-builder-types.component.css'],
  template: `
    <app-packer-builder-types-display
    [packerBuilderTypes]="packerBuilderTypes$ | async"
    (create)="submitForm($event)"
    [packerBuilderTypeEdit]="packerBuilderType$ | async"
    (updatePackerBuilderType)="updateForm($event)"
    (remove)="onRemove($event)">

    </app-packer-builder-types-display>
  `
})
export class PackerBuilderTypesComponent  implements OnInit {

  packerBuilderTypes$: Observable<PackerBuilderType[]>;
  packerBuilderType$: Observable<PackerBuilderType>;

  constructor(private store: Store<fromStore.BuildState>, private packerBuilderTypes: PackerBuilderTypesService) {}

  ngOnInit() {
      this.store.dispatch(new fromStore.LoadPackerBuilderTypes());
      this.packerBuilderTypes$ = this.store.select(fromStore.getAllPackerBuilderTypes);
      this.packerBuilderType$ = this.store.select(fromStore.getSelectedPackerBuilderType);
      // this.store.select(fromStore.getQueryParamsEdit).subscribe(x => console.log(x.edit));
  }

  submitForm(packerBuilderType: PackerBuilderType) {
    this.store.dispatch(new fromStore.CreatePackerBuilderType(packerBuilderType));
  }

  updateForm(packerBuilderType: PackerBuilderType) {
    this.store.dispatch(new fromStore.UpdatePackerBuilderType(packerBuilderType));
  }

  onRemove(packerBuilderType: PackerBuilderType) {
    this.store.dispatch(new fromStore.RemovePackerBuilderType(packerBuilderType));
  }
}
