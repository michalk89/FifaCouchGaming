import { createAction, props } from "@ngrx/store";
import { SelectionModel } from "src/app/models/selection.model";
import { TeamModel } from "src/app/models/team.model";

export const setCurrentSelection = createAction(
  "[Selections] Set Current Selection",
  props<{ currentSelectionId: number }>()
);

export const clearCurrentSelection = createAction(
  "[Selections] Clear Current Selection"
);

export const initializeCurrentSelection = createAction(
  "[Selections] Initialize Current Selection"
);

export const loadSelections = createAction("[Selections] Load");

export const updateSelection = createAction(
  "[Selections] Update Selection",
  props<{ selection: SelectionModel }>()
);

export const createSelection = createAction(
  "[Selections] Create Selection",
  props<{ selection: SelectionModel }>()
);

export const deleteSelection = createAction(
  "[Selections] Delete Selection",
  props<{ selectionId: number }>()
);

export const addTeamToSelection = createAction(
  "[Selections] Add Team To Selection",
  props<{ leagueId: number, teamId: number}>()
);

export const deleteTeamFromSelection = createAction(
  "[Selections] Delete Team From Selection",
  props<{ team: TeamModel }>()
);

export const addAllTeamsFromLeagueToSelection = createAction(
  "[Selections] Add All Teams From League To Selection",
  props<{ leagueId: number }>()
);

export const addAllTeamsToSelection = createAction(
  "[Selections] Add All Teams To Selection"
);

export const removeAllTeamsFromSelection = createAction(
  "[Selections] Remove All Teams From Selection"
);

export const addTeamsToSelectionByStars = createAction(
  "[Selections] Add Teams To Selection By Stars",
  props<{ stars: number }>()
);

export const addBestTeamsFromEachLeagueToSelection = createAction(
  "[Selections] Add Best Teams From Each League To Selection"
);

