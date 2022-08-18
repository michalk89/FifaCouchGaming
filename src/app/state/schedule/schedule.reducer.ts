import { createReducer, on } from "@ngrx/store";
import { ScheduleOptionsModel } from "src/app/models/schedule-options.model";
import { ScheduleResultModel } from "src/app/models/schedule-result.model";
import { SchedulePageActions } from "./actions";

export interface ScheduleState {
    options: ScheduleOptionsModel | null;
    scheduleResults: ScheduleResultModel | null;
}

const initialState: ScheduleState = {
    options: null,
    scheduleResults: null
};

export const scheduleReducer = createReducer<ScheduleState>(
    initialState,
    on(SchedulePageActions.setCurrentSchedule, (state, action): ScheduleState => {
        return {
            ...action.schedule
        }
    })
)