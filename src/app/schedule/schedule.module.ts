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

const scheduleRoutes: Routes = [
  { path: '', component: ScheduleComponent }
];

@NgModule({
  declarations: [
    ScheduleComponent
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
