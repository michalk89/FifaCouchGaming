import { createReducer, on } from "@ngrx/store";
import { DrawOptionsModel } from "src/app/models/draw-options.model";
import { DrawResultItemModel } from "src/app/models/draw-result-item.model";
import { DrawPageActions } from "./actions";

export interface DrawState {
    options: DrawOptionsModel | null;
    results: DrawResultItemModel[];
}

const initialState: DrawState = {
    options: null,
    results: []
};

export const drawReducer = createReducer<DrawState>(
    initialState,
    on(DrawPageActions.setCurrentDraw, (state, action): DrawState => {
        return {
            ...action.draw
        }
    })
)