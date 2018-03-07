import { UserDataFilesService } from '../../services/user-data-files.service';
import { Component, OnInit } from '@angular/core';
import { UserDataFile } from '../../models/user-data-file.model';

import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import { Observable } from 'rxjs/Observable';

@Component({
  styleUrls: ['user-data-files.component.css'],
  template: `
    <app-user-data-files-display
      [userDataFiles]="userDataFiles$ | async"
      (create)="submitForm($event)"
      [userDataFileEdit]="userDataFile$ | async"
      (updateUserDataFile)="updateForm($event)"
      (remove)="onRemove($event)">
    </app-user-data-files-display>
  `
})
export class UserDataFilesComponent  implements OnInit {

  userDataFiles$: Observable<UserDataFile[]>;
  userDataFile$: Observable<UserDataFile>;


  constructor(private store: Store<fromStore.BuildState>, private userDataFiles: UserDataFilesService) {}

  ngOnInit() {
      this.store.dispatch(new fromStore.LoadUserDataFiles());
      this.userDataFiles$ = this.store.select(fromStore.getAllUserDataFiles);
      this.userDataFile$ = this.store.select(fromStore.getSelectedUserDataFile);
       // this.store.select(fromStore.getAllUserDataFiles).subscribe(x => console.log(x));
  }

  submitForm(userDataFile: UserDataFile) {
    this.store.dispatch(new fromStore.CreateUserDataFile(userDataFile));
  }

  updateForm(userDataFile: UserDataFile) {
    this.store.dispatch(new fromStore.UpdateUserDataFile(userDataFile));
  }

  onRemove(userDataFile: UserDataFile) {
    this.store.dispatch(new fromStore.RemoveUserDataFile(userDataFile));
  }
}
