import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { State } from "../app.state";
import { DrawPageActions, DrawApiActions } from "./actions";
import { catchError, map, mergeMap, of } from "rxjs";
import { getCurrentDraw, getCurrentDrawResults } from ".";
import { TournamentPageActions } from "../tournament/actions";

@Injectable()
export class DrawEffects {
  constructor(private actions$: Actions, private store: Store<State>) {}

  loadDraw$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DrawPageActions.getCurrentDraw),
      mergeMap(() =>
        this.store.select(getCurrentDraw).pipe(
          map((draw) => DrawApiActions.getDrawSuccess({ draw })),
          catchError((error) =>
            of(DrawApiActions.getDrawFailure({ error }))
          )
        ),
      )
    );
  });

  setTournamentStandings$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DrawPageActions.setCurrentDraw),
      mergeMap(() =>
        this.store.select(getCurrentDrawResults).pipe(
          map((results) => TournamentPageActions.setInitialStandings({ drawResults: results }))
        ),
      )
    );
  });
}
