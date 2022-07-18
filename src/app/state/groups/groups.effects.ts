import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { GroupsPageActions, GroupsApiActions } from "./actions";
import { catchError, mergeMap, of } from "rxjs";
import { map, tap } from "rxjs";

@Injectable()
export class GroupsEffects {
  constructor(private actions$: Actions) {}

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


  // TODO: add


  // TODO: edit
}
