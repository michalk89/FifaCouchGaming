import { createAction, props } from "@ngrx/store";
import { DrawState } from "../draw.reducer";

export const getDrawSuccess = createAction(
  "[Draw API] Load Success",
  props<{ draw: DrawState }>()
);

export const getDrawFailure = createAction(
  "[Draw API] Load Fail",
  props<{ error: string }>()
);
