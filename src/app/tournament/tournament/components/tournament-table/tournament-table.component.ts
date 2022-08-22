import { Component, Input, OnInit } from "@angular/core";
import { TournamentScheduleEntryModel } from "src/app/models/tournament-schedule-entry.model";
import { TournametTableEntryModel } from "src/app/models/tournament-table-entry.model";
import { DrawState } from "src/app/state/draw/draw.reducer";
import { ScheduleState } from "src/app/state/schedule/schedule.reducer";

@Component({
  selector: "app-tournament-table",
  templateUrl: "./tournament-table.component.html",
  styleUrls: ["./tournament-table.component.scss"],
})
export class TournamentTableComponent implements OnInit {
  @Input() schedule: ScheduleState | null;
  @Input() draw: DrawState | null;
  standings: TournametTableEntryModel[] = [];
  updateHistory: TournamentScheduleEntryModel[] = [];

  constructor() {}

  ngOnInit(): void {
    this.generateStandings();
  }

  generateStandings = () => {
    this.standings = this.draw!.results.map((entry) => {
      return {
        playerOrPairName: entry.playerName,
        teams: entry.drawnTeams.join(", "),
        wins: 0,
        draws: 0,
        loses: 0,
        points: 0,
        scoredGoals: 0,
        lostGoals: 0
      };
    });
  };

  updateStandings = (entry: TournamentScheduleEntryModel) => {
    // check if entry already in history
    const lastEntry = this.updateHistory.reverse().find(e => e.id === entry.id);
    if(lastEntry) {
      this.removeScoresToPlayerTableRow(lastEntry.home, lastEntry.homeScore!, lastEntry.awayScore!);
      this.removeScoresToPlayerTableRow(lastEntry.away, lastEntry.awayScore!, lastEntry.homeScore!);
    }
    // update home player
    this.addScoresToPlayerTableRow(entry.home, entry.homeScore!, entry.awayScore!);
    // update away player
    this.addScoresToPlayerTableRow(entry.away, entry.awayScore!, entry.homeScore!);
    // update history
    this.updateHistory.push(entry);
    // make pipe update table
    this.standings = [...this.standings];
  };

  addScoresToPlayerTableRow = (
    playerName: string,
    playerScore: number,
    opponentScore: number
  ) => {
    const row = this.standings.find(x => x.playerOrPairName === playerName);
    if(row) {
      playerScore > opponentScore ? this.addWin(row) : (playerScore < opponentScore ? this.addLose(row) : this.addDraw(row));
      this.addGoals(row, playerScore, opponentScore);
    }
  };

  addWin = (row: TournametTableEntryModel) => {
    row.wins++;
    row.points += 3;
  };

  addDraw = (row: TournametTableEntryModel) => {
    row.draws++;
    row.points++;
  };

  addLose = (row: TournametTableEntryModel) => {
    row.loses++;
  };

  addGoals = (row: TournametTableEntryModel, playerScore: number, opponentScore: number) => {
    row.scoredGoals += +playerScore;
    row.lostGoals += +opponentScore;
  };

  removeScoresToPlayerTableRow = (
    playerName: string,
    playerScore: number,
    opponentScore: number
  ) => {
    const row = this.standings.find(x => x.playerOrPairName === playerName);
    if(row) {
      playerScore > opponentScore ? this.removeWin(row) : (playerScore < opponentScore ? this.removeLose(row) : this.removeDraw(row));
      this.removeGoals(row, playerScore, opponentScore);
    }
  };

  removeWin = (row: TournametTableEntryModel) => {
    row.wins--;
    row.points -= 3;
  };

  removeDraw = (row: TournametTableEntryModel) => {
    row.draws--;
    row.points--;
  };

  removeLose = (row: TournametTableEntryModel) => {
    row.loses--;
  };

  removeGoals = (row: TournametTableEntryModel, playerScore: number, opponentScore: number) => {
    row.scoredGoals -= +playerScore;
    row.lostGoals -= +opponentScore;
  };
}
