import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayersGroupViewComponent } from './players-group-view.component';

describe('PlayersGroupViewComponent', () => {
  let component: PlayersGroupViewComponent;
  let fixture: ComponentFixture<PlayersGroupViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayersGroupViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayersGroupViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
