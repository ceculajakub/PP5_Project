import { Inject, inject } from '@angular/core';
import { signalStore, withMethods, withState, patchState } from '@ngrx/signals';
import { Playlist, Track } from '../../../core/services/models/models';
import { tap, exhaustMap, pipe } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { SpotifyService } from '../../../core/services/spotify.service';

export interface State {
    playlists: Playlist[];
    tracks: Track[];
    fetchStatus: 'idle' | 'pending' | 'success' | 'failed';
    
}

export const initialState: State = {
  playlists: [],
  tracks: [],
  fetchStatus: 'idle'
};

export const PlaylistStore = signalStore(
  withState(initialState),
  withMethods((store, service = inject(SpotifyService)) => ({
    setPlaylists: (playlists: []) => {
      patchState(store, { playlists });
    },
    addPlaylist: (newPlaylist: Playlist) => {
      patchState(store, {
        playlists: [...store.playlists(), newPlaylist],
      });
    },
    modifyPlaylist: (updatedPlaylist: Playlist) => {
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
    fetchTracks: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { fetchStatus: 'pending' })), 
        exhaustMap((playlistId: string) =>
          service.getTracks(playlistId).pipe(
            tapResponse({
              next: (response: any) => {
                const tracks = response.items.map((item: any) => (item.track));
    
                patchState(store, {
                  tracks: tracks, 
                  fetchStatus: 'success', 
                });
    
                console.log(`Tracks downloaded for playlist: ${playlistId}`);
              },
              error: () => {
                patchState(store, { fetchStatus: 'failed' }); 
              },
            })
          )
        )
      )
    )
  }))
);