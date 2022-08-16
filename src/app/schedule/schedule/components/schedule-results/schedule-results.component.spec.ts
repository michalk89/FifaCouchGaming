import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleResultsComponent } from './schedule-results.component';

describe('ScheduleResultsComponent', () => {
  let component: ScheduleResultsComponent;
  let fixture: ComponentFixture<ScheduleResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleResultsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduleResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
