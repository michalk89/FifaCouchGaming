import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ScheduleState } from "./schedule.reducer";

const getScheduleFeatureState = createFeatureSelector<ScheduleState>('schedule');

export const getCurrentSchedule = createSelector(
    getScheduleFeatureState,
    state => state
);

export const getCurrentScheduleResults = createSelector(
    getScheduleFeatureState,
    state => state.scheduleResults?.results ?? []
)