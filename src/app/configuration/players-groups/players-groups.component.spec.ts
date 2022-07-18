import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayersGroupsComponent } from './players-groups.component';

describe('PlayersGroupsComponent', () => {
  let component: PlayersGroupsComponent;
  let fixture: ComponentFixture<PlayersGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayersGroupsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayersGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
