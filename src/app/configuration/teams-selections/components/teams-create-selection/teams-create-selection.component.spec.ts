import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsCreateSelectionComponent } from './teams-create-selection.component';

describe('TeamsCreateSelectionComponent', () => {
  let component: TeamsCreateSelectionComponent;
  let fixture: ComponentFixture<TeamsCreateSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamsCreateSelectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamsCreateSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
