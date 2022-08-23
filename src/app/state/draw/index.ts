import { createFeatureSelector, createSelector } from "@ngrx/store";
import { DrawState } from "./draw.reducer";

const getDrawFeatureState = createFeatureSelector<DrawState>('draw');

export const getCurrentDraw = createSelector(
    getDrawFeatureState,
    state => state
);

export const getCurrentDrawResults = createSelector(
    getDrawFeatureState,
    state => state.results
)