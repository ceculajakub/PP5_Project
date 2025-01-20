import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveTracksComponent } from './remove-tracks.component';

describe('RemoveTracksComponent', () => {
  let component: RemoveTracksComponent;
  let fixture: ComponentFixture<RemoveTracksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemoveTracksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemoveTracksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
