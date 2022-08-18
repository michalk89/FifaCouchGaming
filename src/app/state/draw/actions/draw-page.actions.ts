import { createAction, props } from "@ngrx/store";
import { DrawState } from "../draw.reducer";

export const setCurrentDraw = createAction(
  "[Draw] Set Current Draw",
  props<{ draw: DrawState }>()
);

export const getCurrentDraw = createAction("[Draw] Get Current Draw");
