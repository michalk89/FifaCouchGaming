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

export const deleteGroupSuccess = createAction(
  '[Groups API] Delete Success',
  props<{ groupId: number }>()
);

export const deleteGroupFailure = createAction(
  '[Groups API] Delete Fail',
  props<{ error: string }>()
);
