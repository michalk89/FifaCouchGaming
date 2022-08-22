import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentResultItemComponent } from './tournament-result-item.component';

describe('TournamentResultItemComponent', () => {
  let component: TournamentResultItemComponent;
  let fixture: ComponentFixture<TournamentResultItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TournamentResultItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TournamentResultItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
