import { createAction, props } from "@ngrx/store";
import { ScheduleState } from "../schedule.reducer";

export const getScheduleSuccess = createAction(
  "[Schedule API] Load Success",
  props<{ schedule: ScheduleState }>()
);

export const getScheduleFailure = createAction(
  "[Schedule API] Load Fail",
  props<{ error: string }>()
);
