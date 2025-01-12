import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistsDetailsComponent } from './playlists-details.component';

describe('PlaylistsDetailsComponent', () => {
  let component: PlaylistsDetailsComponent;
  let fixture: ComponentFixture<PlaylistsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlaylistsDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaylistsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
