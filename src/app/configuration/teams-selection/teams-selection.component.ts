import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { LeagueTeamModel } from "src/app/models/league-team.model";
import { LeagueModel } from "src/app/models/league.model";
import { TeamModel } from "src/app/models/team.model";

@Component({
  selector: "app-teams-selection",
  templateUrl: "./teams-selection.component.html",
  styleUrls: ["./teams-selection.component.scss"],
})
export class TeamsSelectionComponent implements OnInit {
  @Input() leagues: LeagueModel[] | null;
  @Input() selectedTeams: TeamModel[];
  @Output() addTeamToCurrentSelectionEvent: EventEmitter<LeagueTeamModel> = new EventEmitter<LeagueTeamModel>();
  @Output() deleteTeamFromCurrentSelectionEvent: EventEmitter<TeamModel> = new EventEmitter<TeamModel>();


  constructor() {}

  ngOnInit(): void {

  }

  addTeamToSelection = (data: LeagueTeamModel) => {
    this.addTeamToCurrentSelectionEvent.emit(data);
  };

  deleteTeamFromSelection = (data: TeamModel) => {
    this.deleteTeamFromCurrentSelectionEvent.emit(data);
  };
}
