import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsFiltersComponent } from './teams-filters.component';

describe('TeamsFiltersComponent', () => {
  let component: TeamsFiltersComponent;
  let fixture: ComponentFixture<TeamsFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamsFiltersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamsFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
