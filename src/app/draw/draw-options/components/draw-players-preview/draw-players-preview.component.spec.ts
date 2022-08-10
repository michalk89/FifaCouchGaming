import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawPlayersPreviewComponent } from './draw-players-preview.component';

describe('DrawPlayersPreviewComponent', () => {
  let component: DrawPlayersPreviewComponent;
  let fixture: ComponentFixture<DrawPlayersPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrawPlayersPreviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrawPlayersPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
