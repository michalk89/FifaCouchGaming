import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentAlertComponent } from './tournament-alert.component';

describe('TournamentAlertComponent', () => {
  let component: TournamentAlertComponent;
  let fixture: ComponentFixture<TournamentAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TournamentAlertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TournamentAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
