import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { GroupModel } from "src/app/models/group.model";
import { SelectionModel } from "src/app/models/selection.model";
import { State } from "src/app/state/app.state";
import {
  getCurrentGroup,
  getError as getGroupsError,
  getGroups,
  getIsEditMode,
} from "src/app/state/groups";
import { GroupsPageActions } from "src/app/state/groups/actions";
import {
  getCurrentSelection,
  getSelections,
  getError as getSelectionsError,
} from "src/app/state/selections";
import { SelectionsPageActions } from "src/app/state/selections/actions";

@Component({
  selector: "app-configuration",
  templateUrl: "./configuration.component.html",
  styleUrls: ["./configuration.component.scss"],
})
export class ConfigurationComponent implements OnInit {
  // groups
  selectedGroup$: Observable<GroupModel | null>;
  groups$: Observable<GroupModel[]>;
  groupsError$: Observable<string>;
  editMode$: Observable<boolean>;

  // selections
  selectedSelection$: Observable<SelectionModel | null>;
  selections$: Observable<SelectionModel[]>;
  selectionsError$: Observable<string>;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.store.dispatch(GroupsPageActions.loadGroups());
    this.store.dispatch(SelectionsPageActions.loadSelections());

    this.groups$ = this.store.select(getGroups);
    this.selectedGroup$ = this.store.select(getCurrentGroup);
    this.groupsError$ = this.store.select(getGroupsError);
    this.editMode$ = this.store.select(getIsEditMode);

    this.selections$ = this.store.select(getSelections);
    this.selectedSelection$ = this.store.select(getCurrentSelection);
    this.selectionsError$ = this.store.select(getSelectionsError);
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

  deleteSelection = (id: number) => {
    this.store.dispatch(
      SelectionsPageActions.deleteSelection({ selectionId: id })
    );
  };

  setCurrentSelection = (id: number) => {
    this.store.dispatch(
      SelectionsPageActions.setCurrentSelection({ currentSelectionId: id })
    );
  };

  createSelection = (selection: SelectionModel) => {
    this.store.dispatch(SelectionsPageActions.createSelection({ selection }));
  };
}
