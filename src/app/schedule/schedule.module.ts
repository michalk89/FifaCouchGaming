import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleComponent } from './schedule/schedule.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { GroupsEffects } from '../state/groups/groups.effects';
import { SelectionsEffects } from '../state/selections/selections.effects';
import { groupsReducer } from '../state/groups/groups.reducer';
import { selectionsReducer } from '../state/selections/selections.reducer';
import { ScheduleOptionsComponent } from './schedule/components/schedule-options/schedule-options.component';
import { SchedulePlayersPreviewComponent } from './schedule/components/schedule-players-preview/schedule-players-preview.component';
import { ScheduleResultsComponent } from './schedule/components/schedule-results/schedule-results.component';

const scheduleRoutes: Routes = [
  { path: '', component: ScheduleComponent }
];

@NgModule({
  declarations: [
    ScheduleComponent,
    ScheduleOptionsComponent,
    SchedulePlayersPreviewComponent,
    ScheduleResultsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(scheduleRoutes),
    StoreModule.forFeature('groups', groupsReducer),
    StoreModule.forFeature('selections', selectionsReducer),
    EffectsModule.forFeature([GroupsEffects, SelectionsEffects]),
  ]
})
export class ScheduleModule { }
