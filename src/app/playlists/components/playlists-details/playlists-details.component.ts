import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Playlist } from '../../containers/playlists-view/Playlist';

@Component({
  selector: 'app-playlists-details',
  templateUrl: './playlists-details.component.html',
  styleUrl: './playlists-details.component.scss'
})
export class PlaylistsDetailsComponent {
  
  // @Input({ required: true }) playlist!: Playlist
  @Input() playlist?: Playlist

  @Output() edit = new EventEmitter<void>();

  onEdit() {
    this.edit.emit()
  }
}
