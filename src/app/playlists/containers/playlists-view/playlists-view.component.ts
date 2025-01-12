import { Component, inject } from '@angular/core';
import { PlaylistsStore } from '../../store/store';

type ModesEnum = 'details' | 'editor' | 'creator';

@Component({
  selector: 'app-playlists-view', // Routeronly!
  templateUrl: './playlists-view.component.html',
  styleUrl: './playlists-view.component.scss',
  // providers: [PlaylistsStore],
})
export class PlaylistsViewComponent {
  store = inject(PlaylistsStore);

  // ngOnInit(): void {
  //   this.store.fetchPlaylists()
  // }
}
