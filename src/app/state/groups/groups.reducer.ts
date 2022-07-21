import { createReducer, on } from "@ngrx/store";
import { GroupModel } from "src/app/models/group.model";
import { GroupsApiActions, GroupsPageActions } from "./actions";

export interface GroupsState {
  groups: GroupModel[];
  currentGroupId: number | null;
  error: string;
  editMode: boolean;
};

const initialState: GroupsState = {
  groups: [    {
    id: 1,
    name: "Quickers",
    players: [
      {
        id: 1,
        name: "QuickBoy",
      },
      {
        id: 2,
        name: "QuickerGirl",
      },
    ],
  },
  {
    id: 2,
    name: "Slowers",
    players: [
      {
        id: 3,
        name: "SlowBoy",
      },
      {
        id: 4,
        name: "SlowerGirl",
      },
    ],
  }],
  currentGroupId: null,
  error: "",
  editMode: false
};

export const groupsReducer = createReducer<GroupsState>(
  initialState,
  on(GroupsPageActions.toggleEditMode, (state): GroupsState => {
    return {
      ...state,
      editMode: !state.editMode
    }
  }),
  on(GroupsPageActions.setCurrentGroup, (state, action): GroupsState => {
    return {
      ...state,
      currentGroupId: action.currentGroupId,
      editMode: false
    };
  }),
  on(GroupsPageActions.clearCurrentGroup, (state): GroupsState => {
    return {
      ...state,
      currentGroupId: null,
      editMode: false
    };
  }),
  on(GroupsPageActions.initializeCurrentGroup, (state): GroupsState => {
    return {
      ...state,
      currentGroupId: 0,
      editMode: true
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
  }),
  on(GroupsApiActions.updateGroupSuccess, (state, action): GroupsState => {
    const updatedGroups = state.groups.map(g => g.id === action.group.id ? action.group : g);
    
    return {
      ...state,
      groups: updatedGroups,
      currentGroupId: action.group.id,
      editMode: false,
      error: ''
    }
  }),
  on(GroupsApiActions.updateGroupFailure, (state, action): GroupsState => {
    return {
      ...state,
      error: action.error
    }
  }),
  on(GroupsApiActions.createGroupSuccess, (state, action): GroupsState => {
    // id update - normally it would get id @ backend
    const updatedGroup = {
      ...action.group,
      id: state.groups.length + 1
    };

    return {
      ...state,
      groups: [...state.groups, updatedGroup],
      editMode: false,
      currentGroupId: updatedGroup.id,
      error: ''
    }
  }),
  on(GroupsApiActions.createGroupFailure, (state, action): GroupsState => {
    return {
      ...state,
      error: action.error
    }
  })
);
