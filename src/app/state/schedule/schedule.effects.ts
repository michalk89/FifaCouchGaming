import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { State } from "../app.state";
import { SchedulePageActions, ScheduleApiActions } from "./actions";
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { getCurrentSchedule } from ".";

@Injectable()
export class ScheduleEffects {
  constructor(private actions$: Actions, private store: Store<State>) {}

  loadSchedule$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SchedulePageActions.getCurrentSchedule),
      mergeMap(() =>
        this.store.select(getCurrentSchedule).pipe(
          map((schedule) => ScheduleApiActions.getScheduleSuccess({ schedule })),
          tap((schedule) => console.log(schedule)),
          catchError((error) =>
            of(ScheduleApiActions.getScheduleFailure({ error }))
          )
        )
      )
    );
  });
}
