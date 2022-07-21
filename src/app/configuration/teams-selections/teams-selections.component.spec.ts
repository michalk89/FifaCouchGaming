import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsSelectionsComponent } from './teams-selections.component';

describe('TeamsSelectionsComponent', () => {
  let component: TeamsSelectionsComponent;
  let fixture: ComponentFixture<TeamsSelectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamsSelectionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamsSelectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
