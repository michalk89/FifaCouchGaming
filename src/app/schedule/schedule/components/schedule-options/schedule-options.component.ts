import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { GroupModel } from "src/app/models/group.model";
import { ScheduleOptionsModel } from "src/app/models/schedule-options.model";
import { ScheduleResultItemModel } from "src/app/models/schedule-result-item.model";
import { GameplayTypeEnum } from "src/app/enums/gameplay-type.enum";
import { PlayerModel } from "src/app/models/player.model";
import { ScheduleResultModel } from "src/app/models/schedule-result.model";
import { TeamPairPlayersModel } from "src/app/models/team-pair-players.model";
import { ScheduleState } from "src/app/state/schedule/schedule.reducer";
import { DrawResultItemModel } from "src/app/models/draw-result-item.model";
import { ScheduleAssignTeamsOptionEnum } from "src/app/enums/schedule-assign-teams-option.enum";


@Component({
  selector: "app-schedule-options",
  templateUrl: "./schedule-options.component.html",
  styleUrls: ["./schedule-options.component.scss"],
})
export class ScheduleOptionsComponent implements OnInit {
  @Input() currentSchedule: ScheduleState | null;
  @Input() drawResults: DrawResultItemModel[] | null;
  @Input() groups: GroupModel[] | null;
  @Input() results: ScheduleResultItemModel[];
  @Output() scheduleResultsGeneratedEvent: EventEmitter<
    ScheduleResultModel
  > = new EventEmitter<ScheduleResultModel>();
  @Output() scheduleCompletedEvent: EventEmitter<ScheduleState> = new EventEmitter<ScheduleState>();

  optionsForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    const scheduleExists = this.currentSchedule?.options != null && this.currentSchedule?.scheduleResults !== null;

    this.optionsForm = this.fb.group({
      playersGroups: [scheduleExists ? this.currentSchedule?.options?.groupId : "null", Validators.required],
      gameplayType: [scheduleExists ? this.currentSchedule?.options?.gameplayType : "null", Validators.required],
      assignTeamsOption: [scheduleExists ? this.currentSchedule?.options?.assignTeamsOption : 0],
      withRematches: [scheduleExists ? this.currentSchedule?.options?.withRematches : "null", Validators.required],
    });

    if(scheduleExists) {
      this.scheduleResultsGeneratedEvent.emit(this.currentSchedule?.scheduleResults!)
    }
  }

  setScheduleOptions = () => {
    const groupId = this.groupIdControl.value;
    const gameplayType = this.gameplayTypeControl.value;
    const assignTeamsOption = this.assignTeamsOptionControl.value;
    const withRematches = this.withRematchesControl.value;

    const o: ScheduleOptionsModel = {
      groupId: +groupId,
      gameplayType: +gameplayType,
      assignTeamsOption: +assignTeamsOption,
      withRematches: withRematches === "true",
    };

    this.generateSchedule(o);
  };

  generateSchedule = (options: ScheduleOptionsModel) => {
    const players =
      this.groups?.find((g) => g.id === options.groupId)?.players ?? [];
    let results: ScheduleResultItemModel[] = [];

    results =
      options.gameplayType === GameplayTypeEnum.SINGLE
        ? this.generateScheduleForSingles(options, players)
        : this.generateScheduleForPairs(options, players);

    const data: ScheduleResultModel = {
      results,
      type: options.gameplayType
    };

    this.scheduleResultsGeneratedEvent.emit(data);
    this.scheduleCompletedEvent.emit({
      options,
      scheduleResults: data
    });
  };

  generateScheduleForSingles = (
    options: ScheduleOptionsModel,
    players: PlayerModel[]
  ): ScheduleResultItemModel[] => {
    const playerNames = players.map((p) => p.name);
    // generate schedule items array
    // then shuffle it
    let results: ScheduleResultItemModel[] = playerNames
      .flatMap((player1, index) =>
        playerNames.slice(index + 1).map((player2) => {
          return {
            home: player1,
            away: player2,
          };
        })
      )
      .sort(() => Math.random() - 0.5);

    // check teams randomization options
    if(options.assignTeamsOption !== ScheduleAssignTeamsOptionEnum.DontAssign) {
      results = options.assignTeamsOption === ScheduleAssignTeamsOptionEnum.AssignRandomly ? this.assignTeamsRandomlyToPlayers(results) : this.assignTeamsEvenlyToPlayers(results);
    }

    return options.withRematches ? this.generateRematches(results) : results;
  };

  generateScheduleForPairs = (
    options: ScheduleOptionsModel,
    players: PlayerModel[]
  ): ScheduleResultItemModel[] => {
    const playerNames = players.map((p) => p.name);

    const pairs: TeamPairPlayersModel[] = playerNames.flatMap(
      (player1, index) =>
        playerNames.slice(index + 1).map((player2) => {
          return {
            player1,
            player2,
          };
        })
    );

    const matches = pairs.flatMap((team1, index) =>
      pairs.slice(index + 1).map((team2) => {
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
      .filter(m => m.home.p1 !== m.away.p1 && m.home.p1 !== m.away.p2 && m.home.p2 !== m.away.p1 && m.home.p2 !== m.away.p2)
    );

    let results: ScheduleResultItemModel[] = matches
      .map(m => {
        return {
          home: `${m.home.p1} & ${m.home.p2}`,
          away: `${m.away.p1} & ${m.away.p2}`
        }
      })
      .sort(() => Math.random() - 0.5);

    // check teams randomization options
    if(options.assignTeamsOption !== ScheduleAssignTeamsOptionEnum.DontAssign) {
      results = options.assignTeamsOption === ScheduleAssignTeamsOptionEnum.AssignRandomly ? this.assignTeamsRandomlyToPlayers(results) : this.assignTeamsEvenlyToPlayers(results);
    }

    return options.withRematches ? this.generateRematches(results) : results;
  };

  assignTeamsRandomlyToPlayers = (results: ScheduleResultItemModel[]): ScheduleResultItemModel[] => {
    return results.map(scheduleItem => {
      const availableTeamsHome = this.drawResults?.find(d => d.playerName === scheduleItem.home)?.drawnTeams;
      const availableTeamsAway = this.drawResults?.find(d => d.playerName === scheduleItem.away)?.drawnTeams;

      if(availableTeamsHome && availableTeamsAway) {
        return {
          ...scheduleItem,
          homeTeam: availableTeamsHome[Math.floor(Math.random() * availableTeamsHome.length)],
          awayTeam: availableTeamsAway[Math.floor(Math.random() * availableTeamsAway.length)]
        }
      }

      return {
        ...scheduleItem,
      }
    });
  };

  assignTeamsEvenlyToPlayers = (results: ScheduleResultItemModel[]): ScheduleResultItemModel[] => {
    if(this.drawResults) {
      let drawResults: { [key: string]: string[] } = {};
      this.drawResults.forEach(dr => {
        Object.assign(drawResults, { [dr.playerName]: dr.drawnTeams })
      });
      const initialDrawResults = {...drawResults};

      return results.map(scheduleItem => {
        const availableTeamsHome = drawResults[scheduleItem.home];
        const availableTeamsAway = drawResults[scheduleItem.away];
  
        if(availableTeamsHome && availableTeamsAway) {
          const selectedHomeTeam = availableTeamsHome[Math.floor(Math.random() * availableTeamsHome.length)];
          const selectedAwayTeam = availableTeamsAway[Math.floor(Math.random() * availableTeamsAway.length)];

          // remove selected options and restore all options if array empty
          drawResults[scheduleItem.home] = drawResults[scheduleItem.home].filter(x => x !== selectedHomeTeam);
          if(drawResults[scheduleItem.home].length === 0) {
            drawResults[scheduleItem.home] = initialDrawResults[scheduleItem.home];
          }
          drawResults[scheduleItem.away] = drawResults[scheduleItem.away].filter(x => x !== selectedAwayTeam);
          if(drawResults[scheduleItem.away].length === 0) {
            drawResults[scheduleItem.away] = initialDrawResults[scheduleItem.away];
          }

          return {
            ...scheduleItem,
            homeTeam: selectedHomeTeam,
            awayTeam: selectedAwayTeam
          }
        }
  
        return {
          ...scheduleItem,
        }
      });
    }

    return [...results];
  };

  checkIfTeamPlayersAreUnique = (
    team1: TeamPairPlayersModel,
    team2: TeamPairPlayersModel
  ): boolean => {
    return (
      team1.player1 !== team2.player1 &&
      team1.player1 !== team2.player2 &&
      team1.player2 !== team2.player1 &&
      team1.player2 !== team2.player2
    );
  };

  generateRematches = (
    schedule: ScheduleResultItemModel[]
  ): ScheduleResultItemModel[] => {
    const rematches = schedule.map((item) => {
      return {
        home: item.away,
        away: item.home,
        homeTeam: item.awayTeam,
        awayTeam: item.homeTeam
      };
    });

    return [...schedule, ...rematches];
  };

  get groupIdControl() {
    return this.optionsForm.controls["playersGroups"];
  };

  get gameplayTypeControl() {
    return this.optionsForm.controls["gameplayType"];
  };

  get assignTeamsOptionControl() {
    return this.optionsForm.controls["assignTeamsOption"];
  };

  get withRematchesControl() {
    return this.optionsForm.controls["withRematches"];
  };

  get submitBtnEnabled() {
    return (
      this.groupIdControl.valid &&
      this.groupIdControl.value !== "null" &&
      this.withRematchesControl.valid &&
      this.withRematchesControl.value !== "null" &&
      this.gameplayTypeControl.valid &&
      this.gameplayTypeControl.value !== "null"
    );
  };
}
