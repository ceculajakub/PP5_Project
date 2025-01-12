import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Playlist } from '../../playlists/containers/playlists-view/Playlist';
import {
  AlbumResponse,
  AlbumSearchResponse,
  PagingObject,
} from '../model/album';

@Injectable({
  providedIn: 'root',
})
export class MusicApiService {
  http = inject(HttpClient);

  search(query: string) {
    return this.http
      .get<AlbumSearchResponse>('search', {
        params: {
          type: 'album',
          query,
        },
      })
      .pipe(map((res) => res.albums.items));
  }

  getAlbumById(id: string) {
    return this.http.get<AlbumResponse>('albums/' + id);
  }

  getPlaylistById(id: string) {
    return this.http.get<Playlist>('playlists/' + id);
  }

  getMyPlaylists() {
    return this.http
      .get<PagingObject<Playlist>>('me/playlists')
      .pipe(map((res) => res.items));
  }
}