import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { State } from "src/app/state/app.state";
import { getCurrentDraw } from "src/app/state/draw";
import { DrawState } from "src/app/state/draw/draw.reducer";
import { getCurrentSchedule } from "src/app/state/schedule";
import { ScheduleState } from "src/app/state/schedule/schedule.reducer";

@Component({
  selector: "app-tournament",
  templateUrl: "./tournament.component.html",
  styleUrls: ["./tournament.component.scss"],
})
export class TournamentComponent implements OnInit {
  draw$: Observable<DrawState>;
  schedule$: Observable<ScheduleState>;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.draw$ = this.store.select(getCurrentDraw);
    this.schedule$ = this.store.select(getCurrentSchedule);
  }
}
