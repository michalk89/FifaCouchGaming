import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { SelectionsPageActions, SelectionsApiActions } from "./actions";
import { catchError, mergeMap, of } from "rxjs";
import { map, tap } from "rxjs";
import { Store } from "@ngrx/store";
import { State } from "../app.state";
import { getSelections } from ".";

@Injectable()
export class SelectionsEffects {
  constructor(private actions$: Actions, private store: Store<State>) {}

  loadSelections$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SelectionsPageActions.loadSelections),
      mergeMap(() =>
        this.store.select(getSelections).pipe(
          map((selections) =>
            SelectionsApiActions.loadSelectionsSuccess({ selections })
          ),
          tap((selections) => console.log(selections)),
          catchError((error) =>
            of(SelectionsApiActions.loadSelectionsFailure({ error }))
          )
        )
      )
    );
  });

  deleteSelection$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SelectionsPageActions.deleteSelection),
      mergeMap((action) =>
        of(action.selectionId).pipe(
          map(() =>
            SelectionsApiActions.deleteSelectionSuccess({
              selectionId: action.selectionId,
            })
          ),
          catchError((error) =>
            of(SelectionsApiActions.deleteSelectionFailure({ error }))
          )
        )
      )
    );
  });

  createSelection$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SelectionsPageActions.createSelection),
      mergeMap((action) =>
        of(action.selection).pipe(
          map(() =>
            SelectionsApiActions.createSelectionSuccess({
              selection: action.selection,
            })
          ),
          catchError((error) =>
            of(SelectionsApiActions.createSelectionFailure({ error }))
          )
        )
      )
    );
  });

  updateSelection$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SelectionsPageActions.updateSelection),
      mergeMap((action) =>
        of(action.selection).pipe(
          map(() =>
            SelectionsApiActions.updateSelectionSuccess({
              selection: action.selection,
            })
          ),
          catchError((error) =>
            of(SelectionsApiActions.updateSelectionFailure({ error }))
          )
        )
      )
    );
  });
}
