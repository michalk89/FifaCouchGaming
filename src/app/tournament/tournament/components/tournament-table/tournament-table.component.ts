import { Component, Input, OnInit } from "@angular/core";
import { TournametTableEntryModel } from "src/app/models/tournament-table-entry.model";
import { DrawState } from "src/app/state/draw/draw.reducer";

@Component({
  selector: "app-tournament-table",
  templateUrl: "./tournament-table.component.html",
  styleUrls: ["./tournament-table.component.scss"],
})
export class TournamentTableComponent implements OnInit {
  @Input() standings: TournametTableEntryModel[] | null;

  constructor() { }

  ngOnInit(): void {

  }
}
