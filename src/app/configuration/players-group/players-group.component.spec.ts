import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayersGroupComponent } from './players-group.component';

describe('PlayersGroupComponent', () => {
  let component: PlayersGroupComponent;
  let fixture: ComponentFixture<PlayersGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayersGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayersGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
