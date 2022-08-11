import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-teams-filters',
  templateUrl: './teams-filters.component.html',
  styleUrls: ['./teams-filters.component.scss']
})
export class TeamsFiltersComponent implements OnInit {
  @Output() addAllTeamsEvent: EventEmitter<void> = new EventEmitter<void>();
  @Output() removeAllTeamsEvent: EventEmitter<void> = new EventEmitter<void>();
  @Output() addTeamsByStarsEvent: EventEmitter<number> = new EventEmitter<number>();
  @Output() addBestTeamsFromEachLeagueEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  addAll = () => {
    this.addAllTeamsEvent.emit();
  };

  removeAll = () => {
    this.removeAllTeamsEvent.emit();
  };

  addTeamsByStars = (stars: number) => {
    this.addTeamsByStarsEvent.emit(stars);
  };

  addBestTeamsFromEachLeague = () => {
    this.addBestTeamsFromEachLeagueEvent.emit();
  };
}
