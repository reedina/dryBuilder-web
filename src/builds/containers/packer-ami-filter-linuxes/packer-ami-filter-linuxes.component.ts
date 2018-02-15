import { AmiFilterLinuxesService } from '../../services/packer-ami-filter-linuxes.service';
import { Component, OnInit } from '@angular/core';
import { AmiFilterLinux } from '../../models/packer-ami-filter-linux.model';

import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import { Observable } from 'rxjs/Observable';

@Component({
  styleUrls: ['packer-ami-filter-linuxes.component.css'],
  template: `
  <app-ami-filter-linuxes-display
    [amiFilterLinuxes]="amiFilterLinuxes$ | async"
    (create)="submitForm($event)"
    [amiFilterLinuxEdit]="amiFilterLinux$ | async"
    (updateAmiFilterLinux)="updateForm($event)"
    (remove)="onRemove($event)">
  </app-ami-filter-linuxes-display>
  `
})
export class AmiFilterLinuxesComponent  implements OnInit {

  amiFilterLinuxes$: Observable<AmiFilterLinux[]>;
  amiFilterLinux$: Observable<AmiFilterLinux>;

  constructor(private store: Store<fromStore.BuildState>, private amiFilterLinuxes: AmiFilterLinuxesService) {}

  ngOnInit() {
      this.store.dispatch(new fromStore.LoadAmiFilterLinuxes());
      this.amiFilterLinuxes$ = this.store.select(fromStore.getAllAmiFilterLinuxes);
      this.amiFilterLinux$ = this.store.select(fromStore.getSelectedAmiFilterLinux);
      // this.store.select(fromStore.getQueryParamsEdit).subscribe(x => console.log(x.edit));
  }

  submitForm(amiFilterLinux: AmiFilterLinux) {
    this.store.dispatch(new fromStore.CreateAmiFilterLinux(amiFilterLinux));
  }

  updateForm(amiFilterLinux: AmiFilterLinux) {
    this.store.dispatch(new fromStore.UpdateAmiFilterLinux(amiFilterLinux));
  }

  onRemove(amiFilterLinux: AmiFilterLinux) {
    this.store.dispatch(new fromStore.RemoveAmiFilterLinux(amiFilterLinux));
  }
}
