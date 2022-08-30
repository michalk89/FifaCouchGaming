import { Injectable } from "@angular/core";
import { GameplayTypeEnum } from "src/app/enums/gameplay-type.enum";
import { ScheduleAssignTeamsOptionEnum } from "src/app/enums/schedule-assign-teams-option.enum";
import { DrawResultItemModel } from "src/app/models/draw-result-item.model";
import { GroupModel } from "src/app/models/group.model";
import { PlayerModel } from "src/app/models/player.model";
import { ScheduleOptionsModel } from "src/app/models/schedule-options.model";
import { ScheduleResultItemModel } from "src/app/models/schedule-result-item.model";
import { ScheduleResultModel } from "src/app/models/schedule-result.model";
import { TeamPairPlayersModel } from "src/app/models/team-pair-players.model";

@Injectable({
  providedIn: "root",
})
export class ScheduleService {
  constructor() {}

  /**
   * Returns schedule.
   *
   * @param options: ScheduleOptionsModel - selected schedule options
   * @param groups: GroupModel[] - groups of players
   * @param drawnResults: DrawResultItemModel[] - draw results
   *
   * @returns schedule generation result as ScheduleResultModel
   */
  public generateSchedule = (
    options: ScheduleOptionsModel,
    groups: GroupModel[],
    drawnResults: DrawResultItemModel[]
  ): ScheduleResultModel => {
    const players = groups.find((g) => g.id === options.groupId)?.players ?? [];

    const results =
      options.gameplayType === GameplayTypeEnum.SINGLE
        ? this.generateScheduleForSingles(options, players, drawnResults)
        : this.generateScheduleForPairs(options, players, drawnResults);

    const sortedResults =
      options.gameplayType === GameplayTypeEnum.SINGLE
        ? this.sortScheduleForSingles(results)
        : this.sortScheduleForPairs(results);

    const data: ScheduleResultModel = {
      results: sortedResults,
      type: options.gameplayType,
    };

    return data;
  };

  /**
   * Returns schedule result items array for single player mode.
   *
   * @param options: ScheduleOptionsModel - selected schedule options
   * @param players: GroupModel[] - selected players
   * @param drawnResults: DrawResultItemModel[] - draw results
   *
   * @returns schedule items array as ScheduleResultItemModel
   */
  private generateScheduleForSingles = (
    options: ScheduleOptionsModel,
    players: PlayerModel[],
    drawnResults: DrawResultItemModel[]
  ): ScheduleResultItemModel[] => {
    const playerNames = players.map((p) => p.name);
    // generate schedule items array
    // then shuffle it
    let results: ScheduleResultItemModel[] = playerNames.flatMap(
      (player1, index) =>
        playerNames.slice(index + 1).map((player2) => {
          return {
            home: player1,
            away: player2,
          };
        })
    );

    // check teams randomization options
    // if teams were drawn before they will be assigned to players randomly or evenly
    if (
      options.assignTeamsOption !== ScheduleAssignTeamsOptionEnum.DontAssign
    ) {
      results =
        options.assignTeamsOption ===
        ScheduleAssignTeamsOptionEnum.AssignRandomly
          ? this.assignTeamsRandomlyToPlayers(results, drawnResults)
          : this.assignTeamsEvenlyToPlayers(results, drawnResults);
    }

    // return results with or without rematches
    return options.withRematches ? this.generateRematches(results) : results;
  };

  /**
   * Returns schedule result items array for pairs mode.
   *
   * @param options: ScheduleOptionsModel - selected schedule options
   * @param players: GroupModel[] - selected players
   * @param drawnResults: DrawResultItemModel[] - draw results
   *
   * @returns schedule items array as ScheduleResultItemModel
   */
  private generateScheduleForPairs = (
    options: ScheduleOptionsModel,
    players: PlayerModel[],
    drawnResults: DrawResultItemModel[]
  ): ScheduleResultItemModel[] => {
    // get all player names
    const playerNames = players.map((p) => p.name);

    // generate all available pairs
    const pairs: TeamPairPlayersModel[] = playerNames.flatMap(
      (player1, index) =>
        playerNames.slice(index + 1).map((player2) => {
          return {
            player1,
            player2,
          };
        })
    );

    // generate all unique matches
    const matches = pairs.flatMap((team1, index) =>
      pairs
        .slice(index + 1)
        .map((team2) => {
          return {
            home: {
              p1: team1.player1,
              p2: team1.player2,
            },
            away: {
              p1: team2.player1,
              p2: team2.player2,
            },
          };
        })
        .filter(
          (m) =>
            m.home.p1 !== m.away.p1 &&
            m.home.p1 !== m.away.p2 &&
            m.home.p2 !== m.away.p1 &&
            m.home.p2 !== m.away.p2
        )
    );

    // create schedule generation results array
    let results: ScheduleResultItemModel[] = matches.map((m) => {
      return {
        home: `${m.home.p1} & ${m.home.p2}`,
        away: `${m.away.p1} & ${m.away.p2}`,
      };
    });

    // check teams randomization options
    // if teams were drawn before they will be assigned to players randomly or evenly
    if (
      options.assignTeamsOption !== ScheduleAssignTeamsOptionEnum.DontAssign
    ) {
      results =
        options.assignTeamsOption ===
        ScheduleAssignTeamsOptionEnum.AssignRandomly
          ? this.assignTeamsRandomlyToPlayers(results, drawnResults)
          : this.assignTeamsEvenlyToPlayers(results, drawnResults);
    }

    // return results with or without rematches
    return options.withRematches ? this.generateRematches(results) : results;
  };

  private assignTeamsRandomlyToPlayers = (
    results: ScheduleResultItemModel[],
    drawResults: DrawResultItemModel[]
  ): ScheduleResultItemModel[] => {
    return results.map((scheduleItem) => {
      const availableTeamsHome = drawResults.find(
        (d) => d.playerName === scheduleItem.home
      )?.drawnTeams;
      const availableTeamsAway = drawResults.find(
        (d) => d.playerName === scheduleItem.away
      )?.drawnTeams;

      if (availableTeamsHome && availableTeamsAway) {
        return {
          ...scheduleItem,
          homeTeam:
            availableTeamsHome[
              Math.floor(Math.random() * availableTeamsHome.length)
            ],
          awayTeam:
            availableTeamsAway[
              Math.floor(Math.random() * availableTeamsAway.length)
            ],
        };
      }

      return {
        ...scheduleItem,
      };
    });
  };

  private assignTeamsEvenlyToPlayers = (
    results: ScheduleResultItemModel[],
    drawnResults: DrawResultItemModel[]
  ): ScheduleResultItemModel[] => {
    if (drawnResults.length > 0) {
      let drawResults: { [key: string]: string[] } = {};
      drawnResults.forEach((dr) => {
        Object.assign(drawResults, { [dr.playerName]: dr.drawnTeams });
      });
      const initialDrawResults = { ...drawResults };

      return results.map((scheduleItem) => {
        const availableTeamsHome = drawResults[scheduleItem.home];
        const availableTeamsAway = drawResults[scheduleItem.away];

        if (availableTeamsHome && availableTeamsAway) {
          const selectedHomeTeam =
            availableTeamsHome[
              Math.floor(Math.random() * availableTeamsHome.length)
            ];
          const selectedAwayTeam =
            availableTeamsAway[
              Math.floor(Math.random() * availableTeamsAway.length)
            ];

          // remove selected options and restore all options if array empty
          drawResults[scheduleItem.home] = drawResults[
            scheduleItem.home
          ].filter((x) => x !== selectedHomeTeam);
          if (drawResults[scheduleItem.home].length === 0) {
            drawResults[scheduleItem.home] =
              initialDrawResults[scheduleItem.home];
          }
          drawResults[scheduleItem.away] = drawResults[
            scheduleItem.away
          ].filter((x) => x !== selectedAwayTeam);
          if (drawResults[scheduleItem.away].length === 0) {
            drawResults[scheduleItem.away] =
              initialDrawResults[scheduleItem.away];
          }

          return {
            ...scheduleItem,
            homeTeam: selectedHomeTeam,
            awayTeam: selectedAwayTeam,
          };
        }

        return {
          ...scheduleItem,
        };
      });
    }

    return [...results];
  };

  private generateRematches = (
    schedule: ScheduleResultItemModel[]
  ): ScheduleResultItemModel[] => {
    const rematches = schedule.map((item) => {
      return {
        home: item.away,
        away: item.home,
        homeTeam: item.awayTeam,
        awayTeam: item.homeTeam,
      };
    });

    return [...schedule, ...rematches];
  };

  private sortScheduleForSingles = (
    schedule: ScheduleResultItemModel[]
  ): ScheduleResultItemModel[] => {
    const finalResults: ScheduleResultItemModel[] = [];
    let temp = [...schedule];

    do {
      const lastMatch = finalResults[finalResults.length - 1];
      const nextMatchIndex = temp.findIndex(
        (m) =>
          m.home !== lastMatch?.home &&
          m.home !== lastMatch?.away &&
          m.away !== lastMatch?.home &&
          m.away !== lastMatch?.away
      );
      // add found match as next one and remove from temp array
      if (nextMatchIndex !== -1) {
        finalResults.push(temp[nextMatchIndex]);
        temp.splice(nextMatchIndex, 1);
        // cant find unique match, add first one and remove from temp array
      } else {
        finalResults.push(temp[0]);
        temp.splice(0, 1);
      }
    } while (finalResults.length !== schedule.length);

    return finalResults;
  };

  // TODO: FIX (split, some, includes, etc)
  private sortScheduleForPairs = (
    schedule: ScheduleResultItemModel[]
  ): ScheduleResultItemModel[] => {
    const finalResults: ScheduleResultItemModel[] = [];
    let temp = [...schedule];

    do {
      const lastMatch = finalResults[finalResults.length - 1];
      const nextMatchIndex = temp.findIndex(
        (m) =>
          m.home !== lastMatch?.home &&
          m.home !== lastMatch?.away &&
          m.away !== lastMatch?.home &&
          m.away !== lastMatch?.away
      );
      // add found match as next one and remove from temp array
      if (nextMatchIndex !== -1) {
        finalResults.push(temp[nextMatchIndex]);
        temp.splice(nextMatchIndex, 1);
        // cant find unique match, add first one and remove from temp array
      } else {
        finalResults.push(temp[0]);
        temp.splice(0, 1);
      }
    } while (finalResults.length !== schedule.length);

    return finalResults;
  };
}
