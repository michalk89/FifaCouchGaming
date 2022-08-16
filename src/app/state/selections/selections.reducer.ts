import { createReducer, on } from "@ngrx/store";
import { LeagueModel } from "src/app/models/league.model";
import { SelectionModel } from "src/app/models/selection.model";
import { SelectionsApiActions, SelectionsPageActions } from "./actions";

export interface SelectionsState {
  selections: SelectionModel[];
  currentSelectionId: number | null;
  error: string;
  leagues: LeagueModel[];
}

const initialState: SelectionsState = {
  selections: [
    {
      id: 1,
      name: "Test #1",
      selectedTeams: [],
    },
    {
      id: 2,
      name: "Test #2",
      selectedTeams: [],
    },
  ],
  leagues: [
    {
      id: 1,
      name: "Primera Division",
      flagUrl: "/assets/spain.png",
      teams: [
        {
          id: 1,
          name: "Almeria",
          stars: 3,
        },
        {
          id: 2,
          name: "Athletic Bilbao",
          stars: 4,
        },
        {
          id: 3,
          name: "Atletico Madryt",
          stars: 5,
        },
        {
          id: 4,
          name: "FC Barcelona",
          stars: 5,
        },
        {
          id: 5,
          name: "Cadiz",
          stars: 2.5,
        },
        {
          id: 6,
          name: "Celta Vigo",
          stars: 4,
        },
        {
          id: 7,
          name: "Elche",
          stars: 3.5,
        },
        {
          id: 8,
          name: "Espanyol",
          stars: 4,
        },
        {
          id: 9,
          name: "Getafe",
          stars: 3.5,
        },
        {
          id: 10,
          name: "Girona",
          stars: 3,
        },
        {
          id: 11,
          name: "Mallorca",
          stars: 2.5,
        },
        {
          id: 12,
          name: "Osasuna Pampeluna",
          stars: 3.5,
        },
        {
          id: 13,
          name: "Rayo Vallecano",
          stars: 3,
        },
        {
          id: 14,
          name: "Real Betis",
          stars: 4.5,
        },
        {
          id: 15,
          name: "Real Madryt",
          stars: 5,
        },
        {
          id: 16,
          name: "Real Sociedad",
          stars: 4,
        },
        {
          id: 17,
          name: "Real Valladolid",
          stars: 3.5,
        },
        {
          id: 18,
          name: "Sevilla FC",
          stars: 4.5,
        },
        {
          id: 19,
          name: "Valencia CF",
          stars: 4,
        },
        {
          id: 20,
          name: "Villareal",
          stars: 4.5,
        },
      ],
    },
    {
      id: 2,
      name: "Premier League",
      flagUrl: "/assets/england.png",
      teams: [
        {
          id: 21,
          name: "Arsenal",
          stars: 4.5,
        },
        {
          id: 22,
          name: "Aston Villa",
          stars: 4,
        },
        {
          id: 23,
          name: "Bournemouth",
          stars: 3,
        },
        {
          id: 24,
          name: "Brentford",
          stars: 2.5,
        },
        {
          id: 25,
          name: "Brighton",
          stars: 3,
        },
        {
          id: 26,
          name: "Chelsea",
          stars: 5,
        },
        {
          id: 27,
          name: "Crystal Palace",
          stars: 3.5,
        },
        {
          id: 28,
          name: "Everton",
          stars: 3.5,
        },
        {
          id: 29,
          name: "Fulham",
          stars: 3,
        },
        {
          id: 30,
          name: "Leeds",
          stars: 3.5,
        },
        {
          id: 31,
          name: "Leicester City",
          stars: 4,
        },
        {
          id: 32,
          name: "Liverpool",
          stars: 5,
        },
        {
          id: 33,
          name: "Manchester City",
          stars: 5,
        },
        {
          id: 34,
          name: "Manchester United",
          stars: 0,
        },
        {
          id: 35,
          name: "Newcastle",
          stars: 3,
        },
        {
          id: 36,
          name: "Nottingham Forest",
          stars: 2,
        },
        {
          id: 37,
          name: "Southampton",
          stars: 3.5,
        },
        {
          id: 38,
          name: "Tottenham",
          stars: 4,
        },
        {
          id: 39,
          name: "West Ham",
          stars: 4,
        },
        {
          id: 40,
          name: "Wolves",
          stars: 3.5,
        },
      ],
    },
    {
      id: 3,
      name: "Serie A",
      flagUrl: "/assets/italy.png",
      teams: [
        {
          id: 41,
          name: "AC Milan",
          stars: 5,
        },
        {
          id: 42,
          name: "Atalanta",
          stars: 4.5,
        },
        {
          id: 43,
          name: "Bologna",
          stars: 3.5,
        },
        {
          id: 44,
          name: "Cremonese",
          stars: 2,
        },
        {
          id: 45,
          name: "Empoli",
          stars: 3.5,
        },
        {
          id: 46,
          name: "Fiorentina",
          stars: 4,
        },
        {
          id: 47,
          name: "Hellas Verona",
          stars: 3.5,
        },
        {
          id: 48,
          name: "Inter",
          stars: 5,
        },
        {
          id: 49,
          name: "Juventus",
          stars: 5,
        },
        {
          id: 50,
          name: "Lazio",
          stars: 4.5,
        },
        {
          id: 51,
          name: "Lecce",
          stars: 2.5,
        },
        {
          id: 52,
          name: "Monza",
          stars: 2,
        },
        {
          id: 53,
          name: "Roma",
          stars: 4,
        },
        {
          id: 54,
          name: "Napoli",
          stars: 4.5,
        },
        {
          id: 55,
          name: "Salernitana",
          stars: 3,
        },
        {
          id: 56,
          name: "Sampdoria",
          stars: 4,
        },
        {
          id: 57,
          name: "Sassuolo",
          stars: 4,
        },
        {
          id: 58,
          name: "Spezia",
          stars: 3,
        },
        {
          id: 59,
          name: "Torino",
          stars: 3.5,
        },
        {
          id: 60,
          name: "Udinese",
          stars: 4,
        },
      ],
    },
    {
      id: 4,
      name: "Ligue 1",
      flagUrl: "/assets/france.png",
      teams: []
    },
    {
      id: 5,
      name: "Bundesliga",
      flagUrl: "/assets/germany.png",
      teams: []
    },
    {
      id: 6,
      name: "Primeira Liga",
      flagUrl: "/assets/portugal.png",
      teams: []
    },
    {
      id: 7,
      name: "Eredivisie",
      flagUrl: "/assets/netherlands.png",
      teams: []
    },
    {
      id: 8,
      name: "Ekstraklasa",
      flagUrl: "/assets/poland.png",
      teams: []
    },
  ],
  currentSelectionId: null,
  error: "",
};

const updateSelections = (
  updatedGroup: SelectionModel,
  state: SelectionsState
): SelectionModel[] => {
  return state.selections.map((s) =>
    s.id === state.currentSelectionId ? updatedGroup : s
  );
};

export const selectionsReducer = createReducer<SelectionsState>(
  initialState,
  on(
    SelectionsPageActions.setCurrentSelection,
    (state, action): SelectionsState => {
      return {
        ...state,
        currentSelectionId: action.currentSelectionId,
      };
    }
  ),
  on(SelectionsPageActions.clearCurrentSelection, (state): SelectionsState => {
    return {
      ...state,
      currentSelectionId: null,
    };
  }),
  on(
    SelectionsPageActions.initializeCurrentSelection,
    (state, action): SelectionsState => {
      return {
        ...state,
        currentSelectionId: 0,
      };
    }
  ),
  on(
    SelectionsPageActions.addTeamToSelection,
    (state, action): SelectionsState => {
      let updatedGroup = state.selections.find(
        (s) => s.id === state.currentSelectionId
      )!;
      const league = state.leagues.find((l) => l.id === action.leagueId)!;
      const team = league?.teams.find((t) => t.id === action.teamId)!;

      updatedGroup = {
        ...updatedGroup,
        selectedTeams: [...updatedGroup.selectedTeams, team],
      };

      return {
        ...state,
        selections: updateSelections(updatedGroup, state),
      };
    }
  ),
  on(
    SelectionsPageActions.deleteTeamFromSelection,
    (state, action): SelectionsState => {
      let updatedGroup = state.selections.find(
        (s) => s.id === state.currentSelectionId
      )!;
      updatedGroup = {
        ...updatedGroup,
        selectedTeams: [
          ...updatedGroup.selectedTeams.filter((t) => t.id !== action.team.id),
        ],
      };

      return {
        ...state,
        selections: updateSelections(updatedGroup, state),
      };
    }
  ),
  on(
    SelectionsPageActions.addAllTeamsFromLeagueToSelection,
    (state, action): SelectionsState => {
      let teams = state.leagues.find((l) => l.id === action.leagueId)?.teams;
      let updatedGroup = state.selections.find(
        (s) => s.id === state.currentSelectionId
      )!;

      teams = teams!.filter(
        (x) => ![...updatedGroup.selectedTeams].map((t) => t.id).includes(x.id)
      );

      updatedGroup = {
        ...updatedGroup,
        selectedTeams: [...updatedGroup.selectedTeams, ...(teams ?? [])],
      };

      return {
        ...state,
        selections: updateSelections(updatedGroup, state),
      };
    }
  ),
  on(SelectionsPageActions.addAllTeamsToSelection, (state): SelectionsState => {
    const allTeams = state.leagues.flatMap((l) => l.teams);
    let updatedGroup = state.selections.find(
      (s) => s.id === state.currentSelectionId
    )!;
    updatedGroup = { ...updatedGroup, selectedTeams: allTeams };

    return {
      ...state,
      selections: updateSelections(updatedGroup, state),
    };
  }),
  on(
    SelectionsPageActions.removeAllTeamsFromSelection,
    (state): SelectionsState => {
      let updatedGroup = state.selections.find(
        (s) => s.id === state.currentSelectionId
      )!;
      updatedGroup = { ...updatedGroup, selectedTeams: [] };

      return {
        ...state,
        selections: updateSelections(updatedGroup, state),
      };
    }
  ),
  on(
    SelectionsPageActions.addTeamsToSelectionByStars,
    (state, action): SelectionsState => {
      const teams = state.leagues.flatMap((l) =>
        l.teams.filter((t) => t.stars >= action.stars)
      );
      let updatedGroup = state.selections.find(
        (s) => s.id === state.currentSelectionId
      )!;
      updatedGroup = { ...updatedGroup, selectedTeams: teams };

      return {
        ...state,
        selections: updateSelections(updatedGroup, state),
      };
    }
  ),
  on(
    SelectionsPageActions.addBestTeamsFromEachLeagueToSelection,
    (state): SelectionsState => {
      const teams = state.leagues.flatMap((l) =>
        [...l.teams]
          .sort((a, b) => (a.stars > b.stars ? -1 : b.stars > a.stars ? 1 : 0))
          .slice(0, 5)
      );
      let updatedGroup = state.selections.find(
        (s) => s.id === state.currentSelectionId
      )!;
      updatedGroup = { ...updatedGroup, selectedTeams: teams };

      return {
        ...state,
        selections: updateSelections(updatedGroup, state),
      };
    }
  ),
  on(
    SelectionsApiActions.loadSelectionsSuccess,
    (state, action): SelectionsState => {
      return {
        ...state,
        selections: action.selections,
        error: "",
      };
    }
  ),
  on(
    SelectionsApiActions.loadSelectionsFailure,
    (state, action): SelectionsState => {
      return {
        ...state,
        selections: [],
        error: action.error,
      };
    }
  ),
  on(
    SelectionsApiActions.deleteSelectionSuccess,
    (state, action): SelectionsState => {
      return {
        ...state,
        selections: state.selections.filter((s) => s.id !== action.selectionId),
        currentSelectionId: null,
        error: "",
      };
    }
  ),
  on(
    SelectionsApiActions.deleteSelectionFailure,
    (state, action): SelectionsState => {
      return {
        ...state,
        error: action.error,
      };
    }
  ),
  on(
    SelectionsApiActions.updateSelectionSuccess,
    (state, action): SelectionsState => {
      const updatedSelections = state.selections.map((s) =>
        s.id === action.selection.id ? action.selection : s
      );

      return {
        ...state,
        selections: updatedSelections,
        currentSelectionId: action.selection.id,
        error: "",
      };
    }
  ),
  on(
    SelectionsApiActions.updateSelectionFailure,
    (state, action): SelectionsState => {
      return {
        ...state,
        error: action.error,
      };
    }
  ),
  on(
    SelectionsApiActions.createSelectionSuccess,
    (state, action): SelectionsState => {
      // id update - normally it would get id @ backend
      const updatedSelection = {
        ...action.selection,
        id: state.selections.length + 1,
      };

      return {
        ...state,
        selections: [...state.selections, updatedSelection],
        currentSelectionId: updatedSelection.id,
        error: "",
      };
    }
  ),
  on(
    SelectionsApiActions.createSelectionFailure,
    (state, action): SelectionsState => {
      return {
        ...state,
        error: action.error,
      };
    }
  )
);
