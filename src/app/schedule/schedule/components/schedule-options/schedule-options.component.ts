import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { GroupModel } from "src/app/models/group.model";
import { DrawResultItemModel } from "src/app/models/draw-result-item.model";
import { ScheduleOptionsModel } from "src/app/models/schedule-options.model";
import { ScheduleResultItemModel } from "src/app/models/schedule-result-item.model";
import { ScheduleGameplayTypeEnum } from "src/app/enums/schedule-gameplay-type.enum";
import { PlayerModel } from "src/app/models/player.model";

@Component({
  selector: "app-schedule-options",
  templateUrl: "./schedule-options.component.html",
  styleUrls: ["./schedule-options.component.scss"],
})
export class ScheduleOptionsComponent implements OnInit {
  @Input() groups: GroupModel[] | null;
  @Input() results: ScheduleResultItemModel[];
  @Output() scheduleResultsGeneratedEvent: EventEmitter<
    ScheduleResultItemModel[]
  > = new EventEmitter<ScheduleResultItemModel[]>();

  optionsForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.optionsForm = this.fb.group({
      playersGroups: ["null", Validators.required],
      gameplayType: ["null", Validators.required],
      withRematches: ["null", Validators.required],
    });
  }

  setScheduleOptions = () => {
    const groupId = this.groupIdControl.value;
    const gameplayType = this.gameplayTypeControl.value;
    const withRematches = this.withRematchesControl.value;

    const o: ScheduleOptionsModel = {
      groupId: +groupId,
      gameplayType: +gameplayType,
      withRematches: withRematches === "true",
    };

    this.generateSchedule(o);
  };

  generateSchedule = (options: ScheduleOptionsModel) => {
    const players =
      this.groups?.find((g) => g.id === options.groupId)?.players ?? [];
    let results: ScheduleResultItemModel[] = [];

    results =
      options.gameplayType === ScheduleGameplayTypeEnum.SINGLE
        ? this.generateScheduleForSingles(options, players)
        : this.generateScheduleForPairs(options, players);

    this.scheduleResultsGeneratedEvent.emit(results);
  };

  generateScheduleForSingles = (
    options: ScheduleOptionsModel,
    players: PlayerModel[]
  ): ScheduleResultItemModel[] => {
    //const playerNames = players.map(p => p.name);
    const playerNames = ["a", "b", "c", "d", "e"];

    // generate schedule items array
    // then shuffle it
    const results: ScheduleResultItemModel[] = playerNames
      .flatMap((p1, index) =>
        playerNames.slice(index + 1).map((p2) => {
          return {
            home: p1,
            away: p2,
          };
        })
      )
      .sort(() => Math.random() - 0.5);

    return options.withRematches ? this.generateRematches(results) : results;
  };

  generateScheduleForPairs = (
    options: ScheduleOptionsModel,
    players: PlayerModel[]
  ): ScheduleResultItemModel[] => {
    return [];
  };

  generateRematches = (schedule: ScheduleResultItemModel[]): ScheduleResultItemModel[] => {
    const rematches = schedule.map(item => {
      return {
        home: item.away,
        away: item.home
      }
    });

    return [...schedule, ...rematches];
  };

  get groupIdControl() {
    return this.optionsForm.controls["playersGroups"];
  }

  get gameplayTypeControl() {
    return this.optionsForm.controls["gameplayType"];
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
