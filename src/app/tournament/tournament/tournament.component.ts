import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { TournamentScheduleEntryModel } from "src/app/models/tournament-schedule-entry.model";
import { TournametTableEntryModel } from "src/app/models/tournament-table-entry.model";
import { State } from "src/app/state/app.state";
import { getCurrentDraw } from "src/app/state/draw";
import { DrawState } from "src/app/state/draw/draw.reducer";
import { getCurrentSchedule } from "src/app/state/schedule";
import { ScheduleState } from "src/app/state/schedule/schedule.reducer";
import { getSchedule, getStandings } from "src/app/state/tournament";
import { TournamentPageActions } from "src/app/state/tournament/actions";

@Component({
  selector: "app-tournament",
  templateUrl: "./tournament.component.html",
  styleUrls: ["./tournament.component.scss"],
})
export class TournamentComponent implements OnInit {
  draw$: Observable<DrawState>;
  schedule$: Observable<ScheduleState>;
  tournamentStandings$: Observable<TournametTableEntryModel[]>;
  tournamentSchedule$: Observable<TournamentScheduleEntryModel[]>;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.draw$ = this.store.select(getCurrentDraw);
    this.schedule$ = this.store.select(getCurrentSchedule);
    this.tournamentStandings$ = this.store.select(getStandings);
    this.tournamentSchedule$ = this.store.select(getSchedule);
  }

  updateStandingsAndSchedule = (entry: TournamentScheduleEntryModel) => {
    this.store.dispatch(TournamentPageActions.updateStandings({ entry }));
    this.store.dispatch(TournamentPageActions.updateSchedule({ entry }));
  };
}
