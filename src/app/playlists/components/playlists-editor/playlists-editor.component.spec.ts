import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistsEditorComponent } from './playlists-editor.component';

describe('PlaylistsEditorComponent', () => {
  let component: PlaylistsEditorComponent;
  let fixture: ComponentFixture<PlaylistsEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlaylistsEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaylistsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
