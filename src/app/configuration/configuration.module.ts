import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayersGroupsComponent } from './players-groups/players-groups.component';
import { PlayersGroupComponent } from './players-group/players-group.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { groupsReducer } from '../state/groups/groups.reducer';
import { EffectsModule } from '@ngrx/effects';
import { GroupsEffects } from '../state/groups/groups.effects';
import { PlayersGroupViewComponent } from './players-group/components/players-group-view/players-group-view.component';
import { PlayersGroupEditComponent } from './players-group/components/players-group-edit/players-group-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { selectionsReducer } from '../state/selections/selections.reducer';
import { TeamsSelectionsComponent } from './teams-selections/teams-selections.component';
import { SelectionsEffects } from '../state/selections/selections.effects';
import { TeamsCreateSelectionComponent } from './teams-selections/components/teams-create-selection/teams-create-selection.component';
import { TeamsSelectionComponent } from './teams-selection/teams-selection.component';
import { LeagueComponent } from './teams-selection/components/league/league.component';
import { BarRatingModule } from 'ngx-bar-rating';
import { PlayersComponent } from './players/players.component';
import { TeamsComponent } from './teams/teams.component';
import { TeamsFiltersComponent } from './teams-filters/teams-filters.component';
import { SortTeamsPipe } from '../pipes/sort-teams.pipe';

const configurationRoutes: Routes = [
  { path: 'teams', component: TeamsComponent },
  { path: 'players', component: PlayersComponent },
];

@NgModule({
  declarations: [
    PlayersGroupsComponent,
    PlayersGroupComponent,
    PlayersGroupViewComponent,
    PlayersGroupEditComponent,
    TeamsSelectionsComponent,
    TeamsCreateSelectionComponent,
    TeamsSelectionComponent,
    LeagueComponent,
    PlayersComponent,
    TeamsComponent,
    TeamsFiltersComponent,
    SortTeamsPipe
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(configurationRoutes),
    StoreModule.forFeature('groups', groupsReducer),
    StoreModule.forFeature('selections', selectionsReducer),
    EffectsModule.forFeature([GroupsEffects, SelectionsEffects]),
    BarRatingModule
  ]
})
export class ConfigurationModule { }
