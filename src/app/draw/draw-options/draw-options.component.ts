import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DrawOptionsModel } from "src/app/models/draw-options.model";
import { GroupModel } from "src/app/models/group.model";
import { DrawResultItemModel } from "src/app/models/draw-result-item.model";
import { SelectionModel } from "src/app/models/selection.model";
import { TeamModel } from "src/app/models/team.model";
import { DrawState } from "src/app/state/draw/draw.reducer";

@Component({
  selector: "app-draw-options",
  templateUrl: "./draw-options.component.html",
  styleUrls: ["./draw-options.component.scss"],
})
export class DrawOptionsComponent implements OnInit {
  @Input() currentDraw: DrawState | null;
  @Input() selections: SelectionModel[] | null;
  @Input() groups: GroupModel[] | null;
  @Input() results: DrawResultItemModel[];
  @Output() resultsDrawnEvent: EventEmitter<DrawResultItemModel[]> =
    new EventEmitter<DrawResultItemModel[]>();
  @Output() drawCompletedEvent: EventEmitter<DrawState> = new EventEmitter<DrawState>();

  optionsForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    const drawExists = this.currentDraw?.options && this.currentDraw?.results?.length > 0;

    this.optionsForm = this.fb.group({
      playersGroups: [drawExists ? this.currentDraw?.options?.groupId  : "null", Validators.required],
      teamsSelections: [drawExists ? this.currentDraw?.options?.selectionId : "null", Validators.required],
      teamsPerPlayer: [drawExists ? this.currentDraw?.options?.teamsPerPlayer : "null", Validators.required],
      canRepeat: [drawExists ? this.currentDraw?.options?.canTeamsRepeat : "null", Validators.required],
    });

    if(drawExists) {
      this.resultsDrawnEvent.emit(this.currentDraw?.results);
    }
  }

  setDrawOptions = () => {
    const selectionId = this.selectionIdControl.value;
    const groupId = this.groupIdControl.value;
    const teamsPerPlayer = this.teamPerPlayersControl.value;
    const canRepeat = this.canTeamsRepeatControl.value;

    const o: DrawOptionsModel = {
      selectionId: +selectionId,
      groupId: +groupId,
      teamsPerPlayer: +teamsPerPlayer,
      canTeamsRepeat: canRepeat === "true",
    };

    this.draw(o);
  };

  draw = (options: DrawOptionsModel) => {
    const players =
      this.groups?.find((g) => g.id === options.groupId)?.players ?? [];
    const teams =
      this.selections?.find((s) => s.id === options.selectionId)
        ?.selectedTeams ?? [];

    if (players?.length > 0 && teams?.length > 0) {
      const results: DrawResultItemModel[] = players.map((p) => {
        return {
          playerName: p.name,
          drawnTeams: [],
        };
      });

      let availableTeams = [...teams];
      for (let i = 0; i < options.teamsPerPlayer; i++) {
        results.forEach((r) => {
          const teamName = this.drawTeam(availableTeams);
          if (!options.canTeamsRepeat) {
            availableTeams = availableTeams.filter((t) => t.name !== teamName);
          }

          r.drawnTeams.push(teamName);
        });
      }

      this.resultsDrawnEvent.emit(results);
      this.drawCompletedEvent.emit({
        options,
        results
      });
    }
  };

  drawTeam = (options: TeamModel[]): string => {
    return options.length > 0
      ? options[Math.floor(Math.random() * options.length)].name
      : "-";
  };

  get selectionIdControl() {
    return this.optionsForm.controls["teamsSelections"];
  }

  get groupIdControl() {
    return this.optionsForm.controls["playersGroups"];
  }

  get teamPerPlayersControl() {
    return this.optionsForm.controls["teamsPerPlayer"];
  }

  get canTeamsRepeatControl() {
    return this.optionsForm.controls["canRepeat"];
  }

  get submitBtnEnabled() {
    return (
      this.selectionIdControl.valid &&
      this.selectionIdControl.value !== "null" &&
      this.groupIdControl.valid &&
      this.groupIdControl.value !== "null" &&
      this.canTeamsRepeatControl.valid &&
      this.canTeamsRepeatControl.value !== "null" &&
      this.teamPerPlayersControl.valid &&
      this.teamPerPlayersControl.value !== "null"
    );
  }
}
