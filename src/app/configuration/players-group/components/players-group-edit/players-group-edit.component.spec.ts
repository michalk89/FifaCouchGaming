import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayersGroupEditComponent } from './players-group-edit.component';

describe('PlayersGroupEditComponent', () => {
  let component: PlayersGroupEditComponent;
  let fixture: ComponentFixture<PlayersGroupEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayersGroupEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayersGroupEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
