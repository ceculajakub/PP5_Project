import { inject, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { skip } from 'rxjs';
import { PlaylistsViewComponent } from './containers/playlists-view/playlists-view.component';
import { PlaylistsComponent } from './playlists.component';
import { PlaylistsStore } from './store/store';

const routes: Routes = [
  {
    path: '',
    component: PlaylistsComponent,
    children: [
      {
        path: '',
        resolve: {
          playlists() {
            const store = inject(PlaylistsStore);
            store.fetchPlaylists();
            return toObservable(store.playlists).pipe(skip(1));
          },
        },
        component: PlaylistsViewComponent,
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlaylistsRoutingModule { }
