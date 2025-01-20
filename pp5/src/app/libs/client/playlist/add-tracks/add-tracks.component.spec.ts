import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTracksComponent } from './add-tracks.component';

describe('AddTracksComponent', () => {
  let component: AddTracksComponent;
  let fixture: ComponentFixture<AddTracksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTracksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTracksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
