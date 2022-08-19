import { Component, Input, OnInit } from '@angular/core';
import { DrawState } from 'src/app/state/draw/draw.reducer';
import { ScheduleState } from 'src/app/state/schedule/schedule.reducer';

@Component({
  selector: 'app-tournament-results',
  templateUrl: './tournament-results.component.html',
  styleUrls: ['./tournament-results.component.scss']
})
export class TournamentResultsComponent implements OnInit {
  @Input() schedule: ScheduleState | null;
  @Input() draw: DrawState | null;
  tournamentSchedule: any[] = [];
  constructor() { }

  ngOnInit(): void {
    this.generateTournamentSchedule();
  }

  generateTournamentSchedule = () => {
    console.log(this.schedule)
    this.tournamentSchedule = this.schedule!.scheduleResults!.results.map((entry, i) => {
      return {
        id: i+1,
        home: entry.home,
        homeScore: 0,
        away: entry.away,
        awayScore: 0
      }
    });
    console.log(this.tournamentSchedule)
  };

}
