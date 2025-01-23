import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayTracksComponent } from './display-tracks.component';

describe('DisplayTracksComponent', () => {
  let component: DisplayTracksComponent;
  let fixture: ComponentFixture<DisplayTracksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayTracksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayTracksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
