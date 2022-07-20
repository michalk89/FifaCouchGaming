import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GroupModel } from 'src/app/models/group.model';
import { State } from 'src/app/state/app.state';
import { getCurrentGroup, getError, getGroups, getIsEditMode } from 'src/app/state/groups';
import { GroupsPageActions } from 'src/app/state/groups/actions';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {
  selectedGroup$: Observable<GroupModel | null>;
  groups$: Observable<GroupModel[]>
  error$: Observable<string>;
  editMode$: Observable<boolean>;

  constructor(
    private store: Store<State>
  ) { }

  ngOnInit(): void {
    this.store.dispatch(GroupsPageActions.loadGroups());

    this.groups$ = this.store.select(getGroups);
    this.selectedGroup$ = this.store.select(getCurrentGroup);
    this.error$ = this.store.select(getError);
    this.editMode$ = this.store.select(getIsEditMode);
  }

  setCurrentGroup = (id: number) => {
    this.store.dispatch(GroupsPageActions.setCurrentGroup({ currentGroupId: id}));
  };

  deleteGroup = (id: number) => {
    this.store.dispatch(GroupsPageActions.deleteGroup({ groupId: id}));
  };

  toggleEditMode = () => {
    this.store.dispatch(GroupsPageActions.toggleEditMode());
  };

  saveGroup = (group: GroupModel) => {
    this.store.dispatch(GroupsPageActions.updateGroup({ group }));
  };
}
