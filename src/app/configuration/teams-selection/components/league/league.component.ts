import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LeagueTeamModel } from 'src/app/models/league-team.model';
import { LeagueModel } from 'src/app/models/league.model';
import { TeamModel } from 'src/app/models/team.model';

@Component({
  selector: 'app-league',
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.scss']
})
export class LeagueComponent implements OnInit {
  @Input() league: LeagueModel;
  @Input() selectedTeams: TeamModel[];
  @Output() addTeamToSelectionEvent: EventEmitter<LeagueTeamModel> = new EventEmitter<LeagueTeamModel>();
  @Output() addAllTeamsFromLeagueToSelectionEvent: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  addSelectedTeam = (leagueId: number, teamId: number) => {
    this.addTeamToSelectionEvent.emit({ leagueId, teamId});
  };

  addAllTeamsFromLeague = (leagueId: number) => {
    this.addAllTeamsFromLeagueToSelectionEvent.emit(leagueId);
  };

  get selectableTeams() {
    return this.league.teams.filter(t => !this.selectedTeams.includes(t));
  };
}
