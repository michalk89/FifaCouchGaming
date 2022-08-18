import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
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
import { DrawResultsComponent } from './draw-results/draw-results.component';
import { drawReducer } from '../state/draw/draw.reducer';
import { DrawEffects } from '../state/draw/draw.effects';

const drawRoutes: Routes = [
  { path: '', component: DrawComponent }
];

@NgModule({
  declarations: [
    DrawComponent,
    DrawOptionsComponent,
    DrawPlayersPreviewComponent,
    DrawTeamsPreviewComponent,
    DrawResultsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(drawRoutes),
    StoreModule.forFeature('groups', groupsReducer),
    StoreModule.forFeature('selections', selectionsReducer),
    StoreModule.forFeature('draw', drawReducer),
    EffectsModule.forFeature([GroupsEffects, SelectionsEffects, DrawEffects]),
  ]
})
export class DrawModule { }
