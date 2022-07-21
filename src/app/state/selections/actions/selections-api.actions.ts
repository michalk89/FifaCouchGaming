import { createAction, props } from "@ngrx/store";
import { SelectionModel } from "src/app/models/selection.model";

export const loadSelectionsSuccess = createAction(
    '[Selections API] Load Success',
    props<{ selections: SelectionModel[] }>()
  );
  
  export const loadSelectionsFailure = createAction(
    '[Selections API] Load Fail',
    props<{ error: string }>()
  );
  
  export const createSelectionSuccess = createAction(
    '[Selections API] Create Success',
    props<{ selection: SelectionModel }>()
  );
  
  export const createSelectionFailure = createAction(
    '[Selections API] Create Fail',
    props<{ error: string }>()
  );
  
  export const updateSelectionSuccess = createAction(
    '[Selections API] Update Success',
    props<{ selection: SelectionModel }>()
  );
  
  export const updateSelectionFailure = createAction(
    '[Selections API] Update Fail',
    props<{ error: string }>()
  );
  
  export const deleteSelectionSuccess = createAction(
    '[Selections API] Delete Success',
    props<{ selectionId: number }>()
  );
  
  export const deleteSelectionFailure = createAction(
    '[Selections API] Delete Fail',
    props<{ error: string }>()
  );
  