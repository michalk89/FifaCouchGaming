import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TournamentScheduleEntryModel } from 'src/app/models/tournament-schedule-entry.model';

@Component({
  selector: 'app-tournament-results',
  templateUrl: './tournament-results.component.html',
  styleUrls: ['./tournament-results.component.scss']
})
export class TournamentResultsComponent implements OnInit {
  @Input() tournamentSchedule: TournamentScheduleEntryModel[] | null;
  @Output() updateStandingsAndScheduleEvent: EventEmitter<TournamentScheduleEntryModel> = new EventEmitter<TournamentScheduleEntryModel>();

  constructor() { }

  ngOnInit(): void {
    console.log(this.tournamentSchedule)
  }

  updateStandingsAndSchedule = (entry: TournamentScheduleEntryModel) => {
    this.updateStandingsAndScheduleEvent.emit(entry);
  };
}
