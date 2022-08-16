import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulePlayersPreviewComponent } from './schedule-players-preview.component';

describe('SchedulePlayersPreviewComponent', () => {
  let component: SchedulePlayersPreviewComponent;
  let fixture: ComponentFixture<SchedulePlayersPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchedulePlayersPreviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchedulePlayersPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
