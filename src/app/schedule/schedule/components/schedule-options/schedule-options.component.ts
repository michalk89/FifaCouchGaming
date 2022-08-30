import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { GroupModel } from "src/app/models/group.model";
import { ScheduleOptionsModel } from "src/app/models/schedule-options.model";
import { ScheduleResultItemModel } from "src/app/models/schedule-result-item.model";
import { GameplayTypeEnum } from "src/app/enums/gameplay-type.enum";
import { PlayerModel } from "src/app/models/player.model";
import { ScheduleResultModel } from "src/app/models/schedule-result.model";
import { TeamPairPlayersModel } from "src/app/models/team-pair-players.model";
import { ScheduleState } from "src/app/state/schedule/schedule.reducer";
import { DrawResultItemModel } from "src/app/models/draw-result-item.model";
import { ScheduleAssignTeamsOptionEnum } from "src/app/enums/schedule-assign-teams-option.enum";
import { ScheduleService } from "src/app/services/schedule/schedule.service";

@Component({
  selector: "app-schedule-options",
  templateUrl: "./schedule-options.component.html",
  styleUrls: ["./schedule-options.component.scss"],
})
export class ScheduleOptionsComponent implements OnInit {
  @Input() currentSchedule: ScheduleState | null;
  @Input() drawResults: DrawResultItemModel[] | null;
  @Input() groups: GroupModel[] | null;
  @Input() results: ScheduleResultItemModel[];
  @Output() scheduleResultsGeneratedEvent: EventEmitter<ScheduleResultModel> =
    new EventEmitter<ScheduleResultModel>();
  @Output() scheduleCompletedEvent: EventEmitter<ScheduleState> =
    new EventEmitter<ScheduleState>();

  optionsForm: FormGroup;

  constructor(private fb: FormBuilder, private scheduleService: ScheduleService) {}

  ngOnInit(): void {
    const scheduleExists =
      this.currentSchedule?.options != null &&
      this.currentSchedule?.scheduleResults !== null;

    this.optionsForm = this.fb.group({
      playersGroups: [
        scheduleExists ? this.currentSchedule?.options?.groupId : "null",
        Validators.required,
      ],
      gameplayType: [
        scheduleExists ? this.currentSchedule?.options?.gameplayType : "null",
        Validators.required,
      ],
      assignTeamsOption: [
        scheduleExists ? this.currentSchedule?.options?.assignTeamsOption : 0,
      ],
      withRematches: [
        scheduleExists ? this.currentSchedule?.options?.withRematches : "null",
        Validators.required,
      ],
    });

    if (scheduleExists) {
      this.scheduleResultsGeneratedEvent.emit(
        this.currentSchedule?.scheduleResults!
      );
    }
  }

  setScheduleOptions = () => {
    const groupId = this.groupIdControl.value;
    const gameplayType = this.gameplayTypeControl.value;
    const assignTeamsOption = this.assignTeamsOptionControl.value;
    const withRematches = this.withRematchesControl.value;

    const o: ScheduleOptionsModel = {
      groupId: +groupId,
      gameplayType: +gameplayType,
      assignTeamsOption: +assignTeamsOption,
      withRematches: withRematches === "true",
    };

    const schedule = this.scheduleService.generateSchedule(o, this.groups!, this.drawResults!);

    this.scheduleResultsGeneratedEvent.emit(schedule);
    this.scheduleCompletedEvent.emit({
      options: o,
      scheduleResults: schedule,
    });
  };

  get groupIdControl() {
    return this.optionsForm.controls["playersGroups"];
  }

  get gameplayTypeControl() {
    return this.optionsForm.controls["gameplayType"];
  }

  get assignTeamsOptionControl() {
    return this.optionsForm.controls["assignTeamsOption"];
  }

  get withRematchesControl() {
    return this.optionsForm.controls["withRematches"];
  }

  get submitBtnEnabled() {
    return (
      this.groupIdControl.valid &&
      this.groupIdControl.value !== "null" &&
      this.withRematchesControl.valid &&
      this.withRematchesControl.value !== "null" &&
      this.gameplayTypeControl.valid &&
      this.gameplayTypeControl.value !== "null"
    );
  }
}
