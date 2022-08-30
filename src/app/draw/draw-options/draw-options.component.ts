import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DrawOptionsModel } from "src/app/models/draw-options.model";
import { GroupModel } from "src/app/models/group.model";
import { DrawResultItemModel } from "src/app/models/draw-result-item.model";
import { SelectionModel } from "src/app/models/selection.model";
import { DrawState } from "src/app/state/draw/draw.reducer";
import { DrawService } from "src/app/services/draw/draw.service";

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
  @Output() drawCompletedEvent: EventEmitter<DrawState> =
    new EventEmitter<DrawState>();

  optionsForm: FormGroup;

  constructor(private fb: FormBuilder, private drawService: DrawService) {}

  ngOnInit(): void {
    const drawExists =
      this.currentDraw?.options && this.currentDraw?.results?.length > 0;

    this.optionsForm = this.fb.group({
      playersGroups: [
        drawExists ? this.currentDraw?.options?.groupId : "null",
        Validators.required,
      ],
      teamsSelections: [
        drawExists ? this.currentDraw?.options?.selectionId : "null",
        Validators.required,
      ],
      teamsPerPlayer: [
        drawExists ? this.currentDraw?.options?.teamsPerPlayer : "null",
        Validators.required,
      ],
      gameplayType: [
        drawExists ? this.currentDraw?.options?.gameplayType : "null",
        Validators.required,
      ],
      canRepeat: [
        drawExists ? this.currentDraw?.options?.canTeamsRepeat : "null",
        Validators.required,
      ],
    });

    if (drawExists) {
      this.resultsDrawnEvent.emit(this.currentDraw?.results);
    }
  }

  setDrawOptions = () => {
    const selectionId = this.selectionIdControl.value;
    const groupId = this.groupIdControl.value;
    const teamsPerPlayer = this.teamPerPlayersControl.value;
    const gameplayType = this.gameplayTypeControl.value;
    const canRepeat = this.canTeamsRepeatControl.value;

    const drawOptions: DrawOptionsModel = {
      selectionId: +selectionId,
      groupId: +groupId,
      teamsPerPlayer: +teamsPerPlayer,
      gameplayType: +gameplayType,
      canTeamsRepeat: canRepeat === "true",
    };

    const results = this.drawService.draw(drawOptions, this.groups!, this.selections!);

    this.resultsDrawnEvent.emit(results);
    this.drawCompletedEvent.emit({
      options: drawOptions,
      results,
    });
  };

  get selectionIdControl() {
    return this.optionsForm.controls["teamsSelections"];
  };

  get groupIdControl() {
    return this.optionsForm.controls["playersGroups"];
  };

  get teamPerPlayersControl() {
    return this.optionsForm.controls["teamsPerPlayer"];
  };

  get canTeamsRepeatControl() {
    return this.optionsForm.controls["canRepeat"];
  };

  get gameplayTypeControl() {
    return this.optionsForm.controls["gameplayType"];
  };

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
  };
}
