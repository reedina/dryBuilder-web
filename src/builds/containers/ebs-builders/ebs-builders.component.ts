import { getAllEbsBuilders } from './../../store/selectors/ebs-builder.selectors';
import { EbsBuildersService } from '../../services/ebs-builders.service';
import { Component, OnInit } from '@angular/core';
import { EbsBuilder } from '../../models/ebs-builder.model';

import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import { Observable } from 'rxjs/Observable';

@Component({
  styleUrls: ['ebs-builders.component.css'],
  template: `
    <app-ebs-builders-display
    [ebsBuilders]="ebsBuilders$ | async"
    (create)="submitForm($event)"
    [ebsBuilderEdit]="ebsBuilder$ | async"
    (updateEbsBuilder)="updateForm($event)"
    [ebsBuilderClone]="ebsBuilderClone$ | async"
    (remove)="onRemove($event)">
    </app-ebs-builders-display>
  `
})
export class EbsBuildersComponent  implements OnInit {

  ebsBuilders$: Observable<EbsBuilder[]>;
  ebsBuilder$: Observable<EbsBuilder>;
  ebsBuilderClone$: Observable<EbsBuilder>;

  constructor(private store: Store<fromStore.BuildState>, private ebsBuilders: EbsBuildersService) {}

  ngOnInit() {
      this.store.dispatch(new fromStore.LoadEbsBuilders());
      this.ebsBuilders$ = this.store.select(fromStore.getAllEbsBuilders);
      this.ebsBuilder$ = this.store.select(fromStore.getSelectedEbsBuilder);
      this.ebsBuilderClone$ = this.store.select(fromStore.getSelectedEbsBuilderClone);
      // this.store.select(fromStore.getQueryParamsEdit).subscribe(x => console.log(x.edit));
  }

  submitForm(ebsBuilder: EbsBuilder) {
     this.store.dispatch(new fromStore.CreateEbsBuilder(ebsBuilder));
  }

  updateForm(ebsBuilder: EbsBuilder) {
    this.store.dispatch(new fromStore.UpdateEbsBuilder(ebsBuilder));
  }

  onRemove(ebsBuilder: EbsBuilder) {
    this.store.dispatch(new fromStore.RemoveEbsBuilder(ebsBuilder));
  }
}
