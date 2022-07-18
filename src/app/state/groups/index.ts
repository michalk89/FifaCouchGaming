import { createFeatureSelector, createSelector } from "@ngrx/store";
import { GroupsState } from "./groups.reducer";

const getGroupsFeatureState = createFeatureSelector<GroupsState>('groups');

export const getCurrentGroupId = createSelector(
    getGroupsFeatureState,
    state => state.currentGroupId
);

export const getCurrentGroup = createSelector(
    getGroupsFeatureState,
    getCurrentGroupId,
    (state, currentGroupId) => {
        if (currentGroupId === 0) {
            return {
                id: 0,
                name: 'new',
                players: []
            };
        } else {
            return currentGroupId ? state.groups.find(g => g.id === currentGroupId) : null;
        }
    }
);

export const getGroups = createSelector(
    getGroupsFeatureState,
    state => state.groups
);

export const getError = createSelector(
    getGroupsFeatureState,
    state => state.error
);