import { createReducer, on } from "@ngrx/store";
import { SelectionModel } from "src/app/models/selection.model";
import { SelectionsApiActions, SelectionsPageActions } from "./actions";

export interface SelectionsState {
    selections: SelectionModel[];
    currentSelectionId: number | null;
    error: string;
};

const initialState: SelectionsState = {
    selections: [
        {
            id: 1,
            name: "Test #1",
            selectedTeams: []
        },
        {
            id: 2,
            name: "Test #2",
            selectedTeams: []
        }
    ],
    currentSelectionId: null,
    error: ''
};

export const selectionsReducer = createReducer<SelectionsState>(
    initialState,
    on(SelectionsPageActions.setCurrentSelection, (state, action): SelectionsState => {
        return {
            ...state,
            currentSelectionId: action.currentSelectionId,
        }
    }),
    on(SelectionsPageActions.clearCurrentSelection, (state): SelectionsState => {
        return {
            ...state,
            currentSelectionId: null
        }
    }),
    on(SelectionsPageActions.initializeCurrentSelection, (state, action): SelectionsState => {
        return {
            ...state,
            currentSelectionId: 0
        }
    }),
    on(SelectionsApiActions.loadSelectionsSuccess, (state, action): SelectionsState => {
        return {
            ...state,
            selections: action.selections,
            error: ''
        }
    }),
    on(SelectionsApiActions.loadSelectionsFailure, (state, action): SelectionsState => {
        return {
            ...state,
            selections: [],
            error: action.error
        }
    }),
    on(SelectionsApiActions.deleteSelectionSuccess, (state, action): SelectionsState => {
        return {
            ...state,
            selections: state.selections.filter(s => s.id !== action.selectionId),
            currentSelectionId: null,
            error: ''
        }
    }),
    on(SelectionsApiActions.deleteSelectionFailure, (state, action): SelectionsState => {
        return {
            ...state,
            error: action.error
        }
    }),
    on(SelectionsApiActions.updateSelectionSuccess, (state, action): SelectionsState => {
        const updatedSelections = state.selections.map(s => s.id === action.selection.id ? action.selection : s);

        return {
            ...state,
            selections: updatedSelections,
            currentSelectionId: action.selection.id,
            error: ''
        }
    }),
    on(SelectionsApiActions.updateSelectionFailure, (state, action): SelectionsState => {
        return {
            ...state,
            error: action.error
        }
    }),
    on(SelectionsApiActions.createSelectionSuccess, (state, action): SelectionsState => {
        // id update - normally it would get id @ backend
        const updatedSelection = {
            ...action.selection,
            id: state.selections.length + 1
        };

        return {
            ...state,
            selections: [...state.selections, updatedSelection],
            currentSelectionId: updatedSelection.id,
            error: ''
        }
    }),
    on(SelectionsApiActions.createSelectionFailure, (state, action): SelectionsState => {
        return {
            ...state,
            error: action.error
        }
    })
);

