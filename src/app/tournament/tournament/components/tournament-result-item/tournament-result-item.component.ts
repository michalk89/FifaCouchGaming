import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { TournamentScheduleEntryModel } from "src/app/models/tournament-schedule-entry.model";

@Component({
  selector: "app-tournament-result-item",
  templateUrl: "./tournament-result-item.component.html",
  styleUrls: ["./tournament-result-item.component.scss"],
})
export class TournamentResultItemComponent implements OnInit {
  @Input() entry: TournamentScheduleEntryModel | null;
  @Output() updateLiveTableEvent: EventEmitter<TournamentScheduleEntryModel> =
    new EventEmitter<TournamentScheduleEntryModel>();
  scoreOptions: number[] = [...Array(11).keys()];

  entryForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    if (this.entry) {
      console.log(this.entry)
      this.entryForm = this.fb.group({
        homeScore: this.entry.homeScore,
        awayScore: this.entry.awayScore,
      });
    }
  }

  update = () => {
    if (
      this.homeScoreControl.value &&
      this.homeScoreControl.value !== "null" &&
      this.awayScoreControl.value &&
      this.awayScoreControl.value !== "null" &&
      this.entry
    ) {
      this.updateLiveTableEvent.emit({
        ...this.entry,
        homeScore: +this.homeScoreControl.value,
        awayScore: +this.awayScoreControl.value,
      });
    }
  };

  get homeScoreControl() {
    return this.entryForm.controls["homeScore"];
  }

  get awayScoreControl() {
    return this.entryForm.controls["awayScore"];
  }
}
