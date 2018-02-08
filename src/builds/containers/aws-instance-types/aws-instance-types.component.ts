import { Component, OnInit } from '@angular/core';
import { PackerTemplate } from '../../models/packer-template.model';

import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import { Observable } from 'rxjs/Observable';

@Component({
  styleUrls: ['aws-instance-types.component.css'],
  template: `
    <app-aws-instance-types-display></app-aws-instance-types-display>
    <div>Hello from builds component</div>

        <div *ngFor="let template of (packerTemplates$ | async); let i = index">
                  Packer Template Friendly Name: <b>{{ template.friendly_name}}</b>
                  <div *ngFor="let build of template.builders; let i = index">
                           Builder Friendly Name: {{ build.friendly_name }}
                  </div>
        </div>
  `
})
export class AwsInstanceTypesComponent  implements OnInit {

  packerTemplates$: Observable<PackerTemplate[]>;

  constructor(private store: Store<fromStore.BuildState>) {}

  ngOnInit() {
     console.log(this.store.select('packer'));
     this.packerTemplates$ = this.store.select(fromStore.getPackerTemplateEntities);
  }
}
