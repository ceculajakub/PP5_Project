import { computed, inject } from '@angular/core';
import {
    patchState,
    signalStore,
    withComputed,
    withMethods,
    withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { Observable, switchMap } from 'rxjs';
import { MusicApiService } from '../../core/services/music-api.service';
import { mockPlaylists } from '../containers/playlists-view/mockPlaylists';
import { Playlist } from '../containers/playlists-view/Playlist';
type PlaylistsState = {
  playlists: Playlist[];
  isLoading: boolean;
  mode: ModesEnum;
  selectedId: Playlist['id'] | null;
  filter: { query: string; order: 'asc' | 'desc' };
};

const initialState: PlaylistsState = {
  playlists: mockPlaylists,
  mode: 'details',
  selectedId: null,
  isLoading: false,
  filter: { query: '', order: 'asc' },
};

export const PlaylistsStore = signalStore(
  withState(initialState),
  withComputed(({ playlists, selectedId }) => ({
    selected: computed(() => playlists().find((p) => p.id == selectedId())),
  })),
  withMethods((store) => {
    const api = inject(MusicApiService);
    return {
      // 👇 Updating state using the `patchState` function.
      selectPlaylistById(selectedId: string) {
        patchState(store, (state) => ({ selectedId }));
      },
      showDetails() {
        patchState(store, (state) => ({ mode: 'details' as ModesEnum }));
      },
      showEditor() {
        patchState(store, (state) => ({ mode: 'editor' as ModesEnum }));
      },
      savePlaylist(draft: Playlist) {
        patchState(store, (state) => ({
          // https://immerjs.github.io/immer/
          playlists: state.playlists.map((p) => (p.id == draft.id ? draft : p)),
        }));
      },
      createPlaylist(draft: Playlist) {
        patchState(store, (state) => ({
          // https://immerjs.github.io/immer/
          playlists: [...state.playlists, draft], // Immutable!
        }));
      },

      fetchPlaylists: () => {
        return api.getMyPlaylists().subscribe((data) => {
          patchState(store, (state) => ({ playlists: data }));
        });
      },

      fetchPlaylistById: rxMethod((id: Observable<string>) => {
        return id.pipe(
          switchMap((id) => inject(MusicApiService).getPlaylistById(id)),
        );
      }),
    };
  }),
);

type ModesEnum = 'details' | 'editor' | 'creator';
