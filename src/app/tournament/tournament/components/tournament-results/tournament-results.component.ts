import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TournamentScheduleEntryModel } from 'src/app/models/tournament-schedule-entry.model';
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
  tournamentSchedule: TournamentScheduleEntryModel[] = [];
  @Output() updateLiveTableEvent: EventEmitter<TournamentScheduleEntryModel> = new EventEmitter<TournamentScheduleEntryModel>();

  constructor() { }

  ngOnInit(): void {
    this.generateTournamentSchedule();
  }

  generateTournamentSchedule = () => {
    this.tournamentSchedule = this.schedule!.scheduleResults!.results.map((entry, i) => {
      return {
        id: i+1,
        home: entry.home,
        homeScore: null,
        away: entry.away,
        awayScore: null
      }
    });
  };

  updateLiveTable = (entry: TournamentScheduleEntryModel) => {
    this.updateLiveTableEvent.emit(entry);
  };
}
