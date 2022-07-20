import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { GroupsPageActions, GroupsApiActions } from "./actions";
import { catchError, mergeMap, of } from "rxjs";
import { map, tap } from "rxjs";
import { Store } from "@ngrx/store";
import { State } from "../app.state";

@Injectable()
export class GroupsEffects {
  constructor(private actions$: Actions, private store: Store<State>) {}

  // TEMP
  groupsTempData = [
    {
      id: 1,
      name: "Quickers",
      players: [
        {
          id: 1,
          name: "QuickBoy",
        },
        {
          id: 2,
          name: "QuickerGirl",
        },
      ],
    },
    {
      id: 2,
      name: "Slowers",
      players: [
        {
          id: 3,
          name: "SlowBoy",
        },
        {
          id: 4,
          name: "SlowerGirl",
        },
      ],
    },
  ];

  loadGroups$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GroupsPageActions.loadGroups),
      mergeMap(() =>
        of(this.groupsTempData).pipe(
          map((groups) => GroupsApiActions.loadGroupsSuccess({ groups })),
          tap((groups) => console.log(groups)),
          catchError((error) =>
            of(GroupsApiActions.loadGroupsFailure({ error }))
          )
        )
      )
    );
  });

  deleteGroup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GroupsPageActions.deleteGroup),
      mergeMap((action) =>
        of(action.groupId).pipe(
          map(() =>
            GroupsApiActions.deleteGroupSuccess({ groupId: action.groupId })
          ),
          catchError((error) =>
            of(GroupsApiActions.deleteGroupFailure({ error }))
          )
        )
      )
    );
  });

  addGroup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GroupsPageActions.createGroup),
      mergeMap((action) =>
        of(action.group).pipe(
          map(() =>
            GroupsApiActions.createGroupSuccess({ group: action.group })
          ),
          catchError((error) =>
            of(GroupsApiActions.createGroupFailure({ error }))
          )
        )
      )
    );
  });

  updateGroup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GroupsPageActions.updateGroup),
      mergeMap((action) =>
        of(action.group).pipe(
          map(() =>
            GroupsApiActions.updateGroupSuccess({ group: action.group })
          ),
          catchError((error) =>
            of(GroupsApiActions.updateGroupFailure({ error }))
          )
        )
      )
    );
  });
}
