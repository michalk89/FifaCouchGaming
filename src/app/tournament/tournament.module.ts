import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TournamentComponent } from './tournament/tournament.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { scheduleReducer } from '../state/schedule/schedule.reducer';
import { drawReducer } from '../state/draw/draw.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ScheduleEffects } from '../state/schedule/schedule.effects';
import { DrawEffects } from '../state/draw/draw.effects';
import { TournamentTableComponent } from './tournament/components/tournament-table/tournament-table.component';
import { TournamentResultsComponent } from './tournament/components/tournament-results/tournament-results.component';
import { TournamentAlertComponent } from './tournament/components/tournament-alert/tournament-alert.component';
import { SortStandingsPipe } from '../pipes/sort-standings.pipe';
import { TournamentResultItemComponent } from './tournament/components/tournament-result-item/tournament-result-item.component';
import { tournamentReducer } from '../state/tournament/tournament.reducer';

const tournamentRoutes: Routes = [
  { path: '', component: TournamentComponent }
];

@NgModule({
  declarations: [
    TournamentComponent,
    TournamentTableComponent,
    TournamentResultsComponent,
    TournamentAlertComponent,
    SortStandingsPipe,
    TournamentResultItemComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(tournamentRoutes),
    StoreModule.forFeature('schedule', scheduleReducer),
    StoreModule.forFeature('draw', drawReducer),
    StoreModule.forFeature('tournament', tournamentReducer),
    EffectsModule.forFeature([ScheduleEffects, DrawEffects]),
  ]
})
export class TournamentModule { }
