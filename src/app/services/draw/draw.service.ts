import { Injectable } from "@angular/core";
import { GameplayTypeEnum } from "src/app/enums/gameplay-type.enum";
import { DrawOptionsModel } from "src/app/models/draw-options.model";
import { DrawResultItemModel } from "src/app/models/draw-result-item.model";
import { GroupModel } from "src/app/models/group.model";
import { PlayerModel } from "src/app/models/player.model";
import { SelectionModel } from "src/app/models/selection.model";
import { TeamModel } from "src/app/models/team.model";

@Injectable({
  providedIn: "root",
})
export class DrawService {
  constructor() {}

  /**
   * Returns draw results.
   *
   * @param options: DrawOptionsModel - selected draw options
   * @param groups: GroupModel[] - groups of players
   * @param selections: SelectionModel[] - selections of teams
   *
   * @returns draw results as DrawResultItemModel array
   */
  public draw = (
    options: DrawOptionsModel,
    groups: GroupModel[],
    selections: SelectionModel[]
  ): DrawResultItemModel[] => {
    let results: DrawResultItemModel[] = [];
    const players =
      groups?.find((g) => g.id === options.groupId)?.players ?? [];
    const teams =
      selections?.find((s) => s.id === options.selectionId)?.selectedTeams ??
      [];

    if (players?.length > 0 && teams?.length > 0) {
      results =
        options.gameplayType === GameplayTypeEnum.SINGLE
          ? this.getDrawResultsForSingleGameplay(players)
          : this.getDrawResultsForPairGameplay(players);

      let availableTeams = [...teams];
      for (let i = 0; i < options.teamsPerPlayer; i++) {
        results.forEach((r) => {
          const teamName = this.drawTeam(availableTeams);
          if (!options.canTeamsRepeat) {
            availableTeams = availableTeams.filter((t) => t.name !== teamName);
          }

          r.drawnTeams.push(teamName);
        });
      }
    }

    return results;
  };

  /**
   * Returns random team name from available teams
   *
   * @param teams: TeamModel[] - selected draw options
   *
   * @returns random team name as string
   */
  private drawTeam = (teams: TeamModel[]): string => {
    return teams.length > 0
      ? teams[Math.floor(Math.random() * teams.length)].name
      : "-";
  };

  /**
   * Returns players with drawn teams array
   *
   * @param players: PlayerModel[] - selected players for draw
   *
   * @returns array of DrawResultItemModel objects containing player name and drawn teams array
   */
  private getDrawResultsForSingleGameplay = (
    players: PlayerModel[]
  ): DrawResultItemModel[] => {
    return players.map((p) => {
      return {
        playerName: p.name,
        drawnTeams: [],
      };
    });
  };

  /**
   * Returns all possible players pairs with drawn teams array
   *
   * @param players: PlayerModel[] - selected players for draw
   *
   * @returns array of DrawResultItemModel objects containing pair name (as two players names) and drawn teams array
   */
  private getDrawResultsForPairGameplay = (
    players: PlayerModel[]
  ): DrawResultItemModel[] => {
    const playerNames = players.map((p) => p.name);

    const pairs: PlayerModel[] = playerNames.flatMap((player1, index) =>
      playerNames.slice(index + 1).map((player2) => {
        return {
          id: index + 1,
          name: `${player1} & ${player2}`,
        };
      })
    );

    return pairs.map((p) => {
      return {
        playerName: p.name,
        drawnTeams: [],
      };
    });
  };
}
