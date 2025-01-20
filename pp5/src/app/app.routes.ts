import { Routes } from '@angular/router';
import { HomeComponent } from './libs/client/home/home.component';
import { CallbackComponent } from './libs/client/auth/callback/callback.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'callback', component: CallbackComponent },
  {
    path: 'create-playlist',
    loadComponent: () =>
      import(
        './libs/client/playlist/playlist-create/playlist-create.component'
      ).then((c) => c.PlaylistCreateComponent),
  },
  {
    path: 'search-playlist',
    loadComponent: () =>
      import(
        './libs/client/playlist/playlist-search/playlist-search.component'
      ).then((c) => c.PlaylistSearchComponent),
  },
  {
    path: 'track-search',
    loadComponent: () =>
      import('./libs/client/track/track-search/track-search.component').then(
        (c) => c.TrackSearchComponent
      ),
  },
  {
    path: 'add-tracks',
    loadComponent: () =>
      import('./libs/client/playlist/add-tracks/add-tracks.component').then(
        (c) => c.AddTracksComponent
      ),
  },
  {
    path: 'remove-tracks',
    loadComponent: () =>
      import(
        './libs/client/playlist/remove-tracks/remove-tracks.component'
      ).then((c) => c.RemoveTracksComponent),
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('./libs/client/settings/settings.component').then(
        (c) => c.SettingsComponent
      ),
  },
];
