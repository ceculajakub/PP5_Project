import { Inject, inject } from '@angular/core';
import { signalStore, withMethods, withState, patchState } from '@ngrx/signals';
import { Playlist } from '../../../core/services/models/models';
import { tap, exhaustMap, pipe } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { SpotifyService } from '../../../core/services/spotify.service';

export interface State {
    playlists: Playlist[];
    fetchStatus: 'idle' | 'pending' | 'success' | 'failed';
}

export const initialState: State = {
  playlists: [],
  fetchStatus: 'idle'
};

export const PlaylistStore = signalStore(
  withState(initialState),
  withMethods((store, service = inject(SpotifyService)) => ({
    setPlaylists: (playlists: []) => {
      patchState(store, { playlists });
    },
    addPlaylist: (playlist: Playlist) => {
      patchState(store, {
        playlists: [...store.playlists(), playlist],
      });
    },
    modifyPlaylist: (updatedPlaylist: any) => {
      patchState(store, {
        playlists: store.playlists().map((playlist) =>
          playlist.id === updatedPlaylist.id ? updatedPlaylist : playlist
        ),
      });
    },
    removePlaylist: (playlistId: string) => {
      patchState(store, {
        playlists: store.playlists().filter((playlist) => playlist.id !== playlistId),
      });
    },
    fetchPlaylists: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { fetchStatus: 'pending' })),
        exhaustMap(() =>
          service.getPlaylists().pipe(
            tapResponse({
              next: (response: any) => {
                patchState(store, {
                  playlists: response.items,
                  fetchStatus: 'success',
                });
                console.log(`after download ${store.playlists()}`)
              },
              error: () => {
                patchState(store, { fetchStatus: 'failed' });
              },
            })
          )
        )
      )
    ),
  }))
);