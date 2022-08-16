import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TeamModel } from 'src/app/models/team.model';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.scss']
})
export class SelectionComponent implements OnInit {
  @Input() selectedTeams: TeamModel[];
  @Output() deleteTeamFromSelectionEvent: EventEmitter<TeamModel> = new EventEmitter<TeamModel>();

  constructor() { }

  ngOnInit(): void {
  }

  deleteTeamFromSelection = (team: TeamModel) => {
    this.deleteTeamFromSelectionEvent.emit(team);
  };

}
