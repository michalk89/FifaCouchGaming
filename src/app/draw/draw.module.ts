import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { ResultsComponent } from './results/results.component';
import { DrawOptionsComponent } from './draw-options/draw-options.component';
import { DrawComponent } from './draw/draw.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { GroupsEffects } from '../state/groups/groups.effects';
import { groupsReducer } from '../state/groups/groups.reducer';
import { SelectionsEffects } from '../state/selections/selections.effects';
import { selectionsReducer } from '../state/selections/selections.reducer';
import { ReactiveFormsModule } from '@angular/forms';
import { DrawPlayersPreviewComponent } from './draw-options/components/draw-players-preview/draw-players-preview.component';
import { DrawTeamsPreviewComponent } from './draw-options/components/draw-teams-preview/draw-teams-preview.component';

const drawRoutes: Routes = [
  { path: '', component: DrawComponent }
];

@NgModule({
  declarations: [
    DrawComponent,
    ResultsComponent,
    DrawOptionsComponent,
    DrawPlayersPreviewComponent,
    DrawTeamsPreviewComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(drawRoutes),
    StoreModule.forFeature('groups', groupsReducer),
    StoreModule.forFeature('selections', selectionsReducer),
    EffectsModule.forFeature([GroupsEffects, SelectionsEffects]),
  ]
})
export class DrawModule { }
