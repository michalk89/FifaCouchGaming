import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawTeamsPreviewComponent } from './draw-teams-preview.component';

describe('DrawTeamsPreviewComponent', () => {
  let component: DrawTeamsPreviewComponent;
  let fixture: ComponentFixture<DrawTeamsPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrawTeamsPreviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrawTeamsPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
