import { Component, OnInit, ViewChild } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { TournamentScheduleEntryModel } from "src/app/models/tournament-schedule-entry.model";
import { State } from "src/app/state/app.state";
import { getCurrentDraw } from "src/app/state/draw";
import { DrawState } from "src/app/state/draw/draw.reducer";
import { getCurrentSchedule } from "src/app/state/schedule";
import { ScheduleState } from "src/app/state/schedule/schedule.reducer";
import { TournamentTableComponent } from 'src/app/tournament/tournament/components/tournament-table/tournament-table.component';

@Component({
  selector: "app-tournament",
  templateUrl: "./tournament.component.html",
  styleUrls: ["./tournament.component.scss"],
})
export class TournamentComponent implements OnInit {
  draw$: Observable<DrawState>;
  schedule$: Observable<ScheduleState>;
  @ViewChild(TournamentTableComponent) table : TournamentTableComponent;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.draw$ = this.store.select(getCurrentDraw);
    this.schedule$ = this.store.select(getCurrentSchedule);
  }

  updateLiveTable = (entry: TournamentScheduleEntryModel) => {
    this.table.updateStandings(entry);
  };
}
