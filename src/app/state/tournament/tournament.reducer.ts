import { createReducer, on } from "@ngrx/store";
import { TournamentHelper } from "src/app/helpers/tournament-helper";
import { TournamentScheduleEntryModel } from "src/app/models/tournament-schedule-entry.model";
import { TournametTableEntryModel } from "src/app/models/tournament-table-entry.model";
import { TournamentPageActions } from "./actions";

export interface TournamentState {
  standings: TournametTableEntryModel[];
  updateHistory: TournamentScheduleEntryModel[];
  schedule: TournamentScheduleEntryModel[];
}

const initialState: TournamentState = {
  standings: [],
  updateHistory: [],
  schedule: [],
};

export const tournamentReducer = createReducer<TournamentState>(
  initialState,
  on(
    TournamentPageActions.setInitialStandings,
    (state, action): TournamentState => {
      return {
        ...state,
        standings: action.drawResults.map((entry) => {
          return {
            playerOrPairName: entry.playerName,
            teams: entry.drawnTeams.join(", "),
            wins: 0,
            draws: 0,
            loses: 0,
            points: 0,
            scoredGoals: 0,
            lostGoals: 0,
          };
        }),
      };
    }
  ),
  on(
    TournamentPageActions.setInitialSchedule,
    (state, action): TournamentState => {
      return {
        ...state,
        schedule: state.schedule.length > 0 && state.schedule.length == action.scheduleResults.length ? state.schedule : action.scheduleResults.map((entry, i) => {
          return {
            id: i + 1,
            home: entry.home,
            homeScore: null,
            away: entry.away,
            awayScore: null,
          };
        }),
      };
    }
  ),
  on(
    TournamentPageActions.updateStandings,
    (state, action): TournamentState => {
      let updatedStandings = [...state.standings];

      // check if entry already in history
      const lastEntry = {...[...state.updateHistory].reverse().find((e) => e.id === action.entry.id)};

      if (lastEntry) {
        updatedStandings = TournamentHelper.removeScoresFromPlayerTableRow(
          updatedStandings,
          lastEntry.home!,
          lastEntry.homeScore!,
          lastEntry.awayScore!
        );
        updatedStandings = TournamentHelper.removeScoresFromPlayerTableRow(
          updatedStandings,
          lastEntry.away!,
          lastEntry.awayScore!,
          lastEntry.homeScore!
        );
      }
      // update home player
      updatedStandings = TournamentHelper.addScoresToPlayerTableRow(
        updatedStandings,
        action.entry.home,
        action.entry.homeScore!,
        action.entry.awayScore!
      );
      // update away player
      updatedStandings = TournamentHelper.addScoresToPlayerTableRow(
        updatedStandings,
        action.entry.away,
        action.entry.awayScore!,
        action.entry.homeScore!
      );

      return {
        ...state,
        updateHistory: [...state.updateHistory, action.entry],
        standings: [...updatedStandings],
      };
    }
  ),
  on(
    TournamentPageActions.updateSchedule,
    (state, action): TournamentState => {
      const updatedSchedule = state.schedule.map(s => {
        return s.id === action.entry.id ? action.entry : s
      });

      return {
        ...state,
        schedule: [...updatedSchedule]
      };
    }
  )
);
