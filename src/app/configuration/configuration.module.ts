import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayersGroupsComponent } from './players-groups/players-groups.component';
import { PlayersGroupComponent } from './players-group/players-group.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { groupsReducer } from '../state/groups/groups.reducer';
import { EffectsModule } from '@ngrx/effects';
import { GroupsEffects } from '../state/groups/groups.effects';
import { PlayersGroupViewComponent } from './players-group/components/players-group-view/players-group-view.component';
import { PlayersGroupEditComponent } from './players-group/components/players-group-edit/players-group-edit.component';
import { ReactiveFormsModule } from '@angular/forms';

const configurationRoutes: Routes = [
  { path: '', component: ConfigurationComponent }
];

@NgModule({
  declarations: [
    PlayersGroupsComponent,
    PlayersGroupComponent,
    ConfigurationComponent,
    PlayersGroupViewComponent,
    PlayersGroupEditComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(configurationRoutes),
    StoreModule.forFeature('groups', groupsReducer),
    EffectsModule.forFeature([GroupsEffects])
  ]
})
export class ConfigurationModule { }
