import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { GroupModel } from "src/app/models/group.model";
import { SelectionModel } from "src/app/models/selection.model";
import { State } from "src/app/state/app.state";
import { getGroups } from "src/app/state/groups";
import { getSelections } from "src/app/state/selections";
import { ScheduleResultModel } from "src/app/models/schedule-result.model";
import { ScheduleState } from "src/app/state/schedule/schedule.reducer";
import { getCurrentSchedule } from "src/app/state/schedule";
import { SchedulePageActions } from "src/app/state/schedule/actions";
import { getCurrentDrawResults } from "src/app/state/draw";
import { DrawResultItemModel } from "src/app/models/draw-result-item.model";

@Component({
  selector: "app-schedule",
  templateUrl: "./schedule.component.html",
  styleUrls: ["./schedule.component.scss"],
})
export class ScheduleComponent implements OnInit {
  selections$: Observable<SelectionModel[]>;
  groups$: Observable<GroupModel[]>;
  schedule$: Observable<ScheduleState>;
  drawResults$: Observable<DrawResultItemModel[]>;
  scheduleResults: ScheduleResultModel;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.groups$ = this.store.select(getGroups);
    this.selections$ = this.store.select(getSelections);
    this.schedule$ = this.store.select(getCurrentSchedule);
    this.drawResults$ = this.store.select(getCurrentDrawResults);
  }

  setResults = (data: ScheduleResultModel) => {
    this.scheduleResults = data;
  };

  setCurrentSchedule = (schedule: ScheduleState) => {
    this.store.dispatch(SchedulePageActions.setCurrentSchedule({ schedule }));
  };
}
