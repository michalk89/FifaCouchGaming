import { createAction, props } from '@ngrx/store';
import { GroupModel } from 'src/app/models/group.model';

export const loadGroupsSuccess = createAction(
  '[Groups API] Load Success',
  props<{ groups: GroupModel[] }>()
);

export const loadGroupsFailure = createAction(
  '[Groups API] Load Fail',
  props<{ error: string }>()
);

export const createGroupSuccess = createAction(
  '[Groups API] Create Success',
  props<{ group: GroupModel }>()
);

export const createGroupFailure = createAction(
  '[Groups API] Create Fail',
  props<{ error: string }>()
);

export const updateGroupSuccess = createAction(
  '[Groups API] Update Success',
  props<{ group: GroupModel }>()
);

export const updateGroupFailure = createAction(
  '[Groups API] Update Fail',
  props<{ error: string }>()
);

export const deleteGroupSuccess = createAction(
  '[Groups API] Delete Success',
  props<{ groupId: number }>()
);

export const deleteGroupFailure = createAction(
  '[Groups API] Delete Fail',
  props<{ error: string }>()
);
