import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { State } from "../app.state";
import { DrawPageActions, DrawApiActions } from "./actions";
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { getCurrentDraw } from ".";

@Injectable()
export class DrawEffects {
  constructor(private actions$: Actions, private store: Store<State>) {}

  loadDraw$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DrawPageActions.getCurrentDraw),
      mergeMap(() =>
        this.store.select(getCurrentDraw).pipe(
          map((draw) => DrawApiActions.getDrawSuccess({ draw })),
          tap((draw) => console.log(draw)),
          catchError((error) =>
            of(DrawApiActions.getDrawFailure({ error }))
          )
        )
      )
    );
  });
}
