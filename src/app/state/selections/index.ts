import { createFeatureSelector, createSelector } from "@ngrx/store";
import { SelectionsState } from "./selections.reducer";

const getSelectionsFeatureState = createFeatureSelector<SelectionsState>('selections');

export const getCurrentSelectionId = createSelector(
    getSelectionsFeatureState,
    state => state.currentSelectionId
);

export const getCurrentSelection = createSelector(
    getSelectionsFeatureState,
    getCurrentSelectionId,
    (state, currentSelectionId) => {
        if(currentSelectionId === 0) {
            return {
                id: 0,
                name: 'New',
                selectedTeams: []
            }
        } else {
            return currentSelectionId ? state.selections.find(s => s.id === currentSelectionId) ?? null : null;
        }
    }
);

export const getSelections = createSelector(
    getSelectionsFeatureState,
    state => state.selections
);

export const getError = createSelector(
    getSelectionsFeatureState,
    state => state.error
);

export const getLeagues = createSelector(
    getSelectionsFeatureState,
    state => state.leagues
);