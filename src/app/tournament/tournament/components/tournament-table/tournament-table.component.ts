import { Component, Input, OnInit } from '@angular/core';
import { TourmanetTableEntryModel } from 'src/app/models/tournament-table-entry.model';
import { DrawState } from 'src/app/state/draw/draw.reducer';
import { ScheduleState } from 'src/app/state/schedule/schedule.reducer';

@Component({
  selector: 'app-tournament-table',
  templateUrl: './tournament-table.component.html',
  styleUrls: ['./tournament-table.component.scss']
})
export class TournamentTableComponent implements OnInit {
  @Input() schedule: ScheduleState | null;
  @Input() draw: DrawState | null;
  standings: TourmanetTableEntryModel[] = [];

  constructor() { }

  ngOnInit(): void {
    this.generateStandings();
  }

  generateStandings = () => {
    this.standings = this.draw!.results.map(entry => {
      return {
        playerOrPairName: entry.playerName,
        teams: entry.drawnTeams.join(", "),
        wins: 0,
        draws: 0,
        loses: 0,
        points: 0
      }
    });
  };
}
