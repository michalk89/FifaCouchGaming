import { createAction, props } from "@ngrx/store";
import { ScheduleState } from "../schedule.reducer";

export const setCurrentSchedule = createAction(
    "[Schedule] Set Current Schedule",
    props<{ schedule: ScheduleState }>()
  );
  
  export const getCurrentSchedule = createAction("[Schedule] Get Current Schedule");