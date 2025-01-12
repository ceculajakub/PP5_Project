import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Playlist } from '../../containers/playlists-view/Playlist';

@Component({
  selector: 'app-playlists-list',
  templateUrl: './playlists-list.component.html',
  styleUrl: './playlists-list.component.scss',
})
export class PlaylistsListComponent {

  @Input('items') playlists: Playlist[] = []

  @Input() selectedId: string | null = ''

  @Output() selectedIdChange = new EventEmitter<Playlist['id']>();

  select(id: string) {
    this.selectedIdChange.emit(id)
  }
}
