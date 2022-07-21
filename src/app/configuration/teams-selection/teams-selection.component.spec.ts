import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsSelectionComponent } from './teams-selection.component';

describe('TeamsSelectionComponent', () => {
  let component: TeamsSelectionComponent;
  let fixture: ComponentFixture<TeamsSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamsSelectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamsSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
