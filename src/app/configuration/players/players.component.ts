import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GroupModel } from 'src/app/models/group.model';
import { State } from 'src/app/state/app.state';
import { getCurrentGroup, getGroups, getIsEditMode, getError as getGroupsError } from 'src/app/state/groups';
import { GroupsPageActions } from 'src/app/state/groups/actions';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit {
  selectedGroup$: Observable<GroupModel | null>;
  groups$: Observable<GroupModel[]>;
  groupsError$: Observable<string>;
  editMode$: Observable<boolean>;
  
  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.store.dispatch(GroupsPageActions.loadGroups());
    
    this.groups$ = this.store.select(getGroups);
    this.selectedGroup$ = this.store.select(getCurrentGroup);
    this.groupsError$ = this.store.select(getGroupsError);
    this.editMode$ = this.store.select(getIsEditMode);
  }

  setCurrentGroup = (id: number) => {
    this.store.dispatch(
      GroupsPageActions.setCurrentGroup({ currentGroupId: id })
    );
  };

  deleteGroup = (id: number) => {
    this.store.dispatch(GroupsPageActions.deleteGroup({ groupId: id }));
  };

  toggleEditMode = () => {
    this.store.dispatch(GroupsPageActions.toggleEditMode());
  };

  saveGroup = (group: GroupModel) => {
    group.id === 0
      ? this.store.dispatch(GroupsPageActions.createGroup({ group }))
      : this.store.dispatch(GroupsPageActions.updateGroup({ group }));
  };

  createGroup = () => {
    this.store.dispatch(GroupsPageActions.initializeCurrentGroup());
  };

}
