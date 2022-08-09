import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawOptionsComponent } from './draw-options.component';

describe('DrawOptionsComponent', () => {
  let component: DrawOptionsComponent;
  let fixture: ComponentFixture<DrawOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrawOptionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrawOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
