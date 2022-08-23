import { createFeatureSelector, createSelector } from "@ngrx/store";
import { TournamentState } from "./tournament.reducer";

const getTournamentFeatureState = createFeatureSelector<TournamentState>('tournament');

export const getStandings = createSelector(
    getTournamentFeatureState,
    state => state.standings
);

export const getUpdateHistory = createSelector(
    getTournamentFeatureState,
    state => state.updateHistory
);

export const getSchedule = createSelector(
    getTournamentFeatureState,
    state => state.schedule
);