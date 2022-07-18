import { createAction, props } from "@ngrx/store";
import { GroupModel } from "src/app/models/group.model";

export const setCurrentGroup = createAction(
  "[Groups] Set Current Group",
  props<{ currentGroupId: number }>()
);

export const clearCurrentGroup = createAction(
  "[Groups] Clear Current Group"
);

export const initializeCurrentGroup = createAction(
  "[Groups] Initialize Current Group"
);

export const loadGroups = createAction("[Groups] Load");

export const updateGroup = createAction(
  "[Groups] Update Group",
  props<{ group: GroupModel }>()
);

export const createGroup = createAction(
  "[Groups] Create Group",
  props<{ group: GroupModel }>()
);

export const deleteGroup = createAction(
  "[Groups] Delete Group",
  props<{ groupId: number }>()
);
