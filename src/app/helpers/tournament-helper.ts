import { TournametTableEntryModel } from "../models/tournament-table-entry.model";

export class TournamentHelper {
  static addScoresToPlayerTableRow = (
    standings: TournametTableEntryModel[],
    playerName: string,
    playerScore: number,
    opponentScore: number
  ): TournametTableEntryModel[] => {

    const updatedRow = {
      ...standings.find((x) => x.playerOrPairName === playerName)!
    };

    if (updatedRow) {
      playerScore > opponentScore
        ? this.addWin(updatedRow)
        : playerScore < opponentScore
        ? this.addLose(updatedRow)
        : this.addDraw(updatedRow);
      this.addGoals(updatedRow, playerScore, opponentScore);
    }

    return standings.map((s) =>
      s.playerOrPairName === playerName ? updatedRow : s
    );
  };

  static addWin = (row: TournametTableEntryModel) => {
    row.wins++;
    row.points += 3;
  };

  static addDraw = (row: TournametTableEntryModel) => {
    row.draws++;
    row.points++;
  };

  static addLose = (row: TournametTableEntryModel) => {
    row.loses++;
  };

  static addGoals = (
    row: TournametTableEntryModel,
    playerScore: number,
    opponentScore: number
  ) => {
    row.scoredGoals += +playerScore;
    row.lostGoals += +opponentScore;
  };

  static removeScoresFromPlayerTableRow = (
    standings: TournametTableEntryModel[],
    playerName: string,
    playerScore: number,
    opponentScore: number
  ): TournametTableEntryModel[] => {
    const updatedRow = {
      ...standings.find((x) => x.playerOrPairName === playerName)!
    };
    
    if (updatedRow) {
      playerScore > opponentScore
        ? this.removeWin(updatedRow)
        : playerScore < opponentScore
        ? this.removeLose(updatedRow)
        : this.removeDraw(updatedRow);
      this.removeGoals(updatedRow, playerScore, opponentScore);
    }

    return standings.map((s) =>
      s.playerOrPairName === playerName ? updatedRow : s
    );
  };

  static removeWin = (row: TournametTableEntryModel) => {
    row.wins--;
    row.points -= 3;
  };

  static removeDraw = (row: TournametTableEntryModel) => {
    row.draws--;
    row.points--;
  };

  static removeLose = (row: TournametTableEntryModel) => {
    row.loses--;
  };

  static removeGoals = (
    row: TournametTableEntryModel,
    playerScore: number,
    opponentScore: number
  ) => {
    row.scoredGoals -= +playerScore;
    row.lostGoals -= +opponentScore;
  };
}
