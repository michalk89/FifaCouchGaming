import { createReducer, on } from "@ngrx/store";
import { GroupModel } from "src/app/models/group.model";
import { GroupsApiActions, GroupsPageActions } from "./actions";

export interface GroupsState {
  groups: GroupModel[];
  currentGroupId: number | null;
  error: string;
}

const initialState: GroupsState = {
  groups: [],
  currentGroupId: null,
  error: "",
};

export const groupsReducer = createReducer<GroupsState>(
  initialState,
  on(GroupsPageActions.setCurrentGroup, (state, action): GroupsState => {
    return {
      ...state,
      currentGroupId: action.currentGroupId,
    };
  }),
  on(GroupsPageActions.clearCurrentGroup, (state): GroupsState => {
    return {
      ...state,
      currentGroupId: null,
    };
  }),
  on(GroupsPageActions.initializeCurrentGroup, (state): GroupsState => {
    return {
      ...state,
      currentGroupId: 0,
    };
  }),
  on(GroupsApiActions.loadGroupsSuccess, (state, action): GroupsState => {
    return {
      ...state,
      groups: action.groups,
      error: "",
    };
  }),
  on(GroupsApiActions.loadGroupsFailure, (state, action): GroupsState => {
    return {
      ...state,
      groups: [],
      error: action.error,
    };
  }),
  on(GroupsApiActions.deleteGroupSuccess, (state, action): GroupsState => {
    return {
      ...state,
      groups: state.groups.filter(
        (g) => g.id !== action.groupId
      ),
      currentGroupId: null,
      error: "",
    };
  }),
  on(GroupsApiActions.deleteGroupFailure, (state, action): GroupsState => {
    return {
      ...state,
      error: action.error,
    };
  })
);
