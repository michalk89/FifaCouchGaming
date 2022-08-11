import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { LeagueTeamModel } from "src/app/models/league-team.model";
import { LeagueModel } from "src/app/models/league.model";
import { SelectionModel } from "src/app/models/selection.model";
import { TeamModel } from "src/app/models/team.model";
import { State } from "src/app/state/app.state";
import {
  getCurrentSelection,
  getLeagues,
  getSelections,
  getError as getSelectionsError,
} from "src/app/state/selections";
import { SelectionsPageActions } from "src/app/state/selections/actions";

@Component({
  selector: "app-teams",
  templateUrl: "./teams.component.html",
  styleUrls: ["./teams.component.scss"],
})
export class TeamsComponent implements OnInit {
  selectedSelection$: Observable<SelectionModel | null>;
  selections$: Observable<SelectionModel[]>;
  selectionsError$: Observable<string>;
  leagues$: Observable<LeagueModel[]>;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.selections$ = this.store.select(getSelections);
    this.selectedSelection$ = this.store.select(getCurrentSelection);
    this.leagues$ = this.store.select(getLeagues);
    this.selectionsError$ = this.store.select(getSelectionsError);
  }

  deleteSelection = (id: number) => {
    this.store.dispatch(
      SelectionsPageActions.deleteSelection({ selectionId: id })
    );
  };

  setCurrentSelection = (id: number) => {
    this.store.dispatch(
      SelectionsPageActions.setCurrentSelection({ currentSelectionId: id })
    );
  };

  createSelection = (selection: SelectionModel) => {
    this.store.dispatch(SelectionsPageActions.createSelection({ selection }));
  };

  addTeamToSelection = (data: LeagueTeamModel) => {
    this.store.dispatch(SelectionsPageActions.addTeamToSelection(data));
  };

  deleteTeamFromSelection = (data: TeamModel) => {
    this.store.dispatch(
      SelectionsPageActions.deleteTeamFromSelection({ team: data })
    );
  };

  addAllTeamFromLeagueToSelection = (leagueId: number) => {
    this.store.dispatch(
      SelectionsPageActions.addAllTeamsFromLeagueToSelection({ leagueId })
    );
  };

  addAllTeamsToSelection = () => {
    this.store.dispatch(
      SelectionsPageActions.addAllTeamsToSelection()
    );
  };

  removeAllTeamsFromSelection = () => {
    this.store.dispatch(
      SelectionsPageActions.removeAllTeamsFromSelection()
    );
  };

  addTeamsByStars = (stars: number) => {
    this.store.dispatch(
      SelectionsPageActions.addTeamsToSelectionByStars({ stars })
    );
  };

  addBestTeamsFromEachLeague = () => {
    this.store.dispatch(
      SelectionsPageActions.addBestTeamsFromEachLeagueToSelection()
    );
  };
}
