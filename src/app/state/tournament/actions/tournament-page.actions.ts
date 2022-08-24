import { createAction, props } from "@ngrx/store";
import { DrawResultItemModel } from "src/app/models/draw-result-item.model";
import { ScheduleResultItemModel } from "src/app/models/schedule-result-item.model";
import { TournamentScheduleEntryModel } from "src/app/models/tournament-schedule-entry.model";

export const setInitialStandings = createAction(
  "[Tournament] Set Initial Standings",
  props<{ drawResults: DrawResultItemModel[] }>()
);

export const setInitialSchedule = createAction(
  "[Tournament] Set Initial Schedule",
  props<{ scheduleResults: ScheduleResultItemModel[] }>()
);

export const updateStandings = createAction(
  "[Tournament] Update Standings",
  props<{ entry: TournamentScheduleEntryModel }>()
);

export const updateSchedule = createAction(
  "[Tournament] Update Schedule",
  props<{ entry: TournamentScheduleEntryModel }>()
);


