import { createAction, props } from "@ngrx/store";
import { SelectionModel } from "src/app/models/selection.model";

export const setCurrentSelection = createAction(
  "[Selections] Set Current Selection",
  props<{ currentSelectionId: number }>()
);

export const clearCurrentSelection = createAction(
  "[Selections] Clear Current Selection"
);

export const initializeCurrentSelection = createAction(
  "[Selections] Initialize Current Selection"
);

export const loadSelections = createAction("[Selections] Load");

export const updateSelection = createAction(
  "[Selections] Update Selection",
  props<{ selection: SelectionModel }>()
);

export const createSelection = createAction(
  "[Selections] Create Selection",
  props<{ selection: SelectionModel }>()
);

export const deleteSelection = createAction(
  "[Selections] Delete Selection",
  props<{ selectionId: number }>()
);
