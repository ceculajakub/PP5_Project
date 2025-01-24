import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import SpotifyWebApi from 'spotify-web-api-js';
import { environment } from '../../../environments/environment';
import { CreatePlaylistRequest, PlaylistsListResponse } from './models/models';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {

  private api: SpotifyWebApi.SpotifyWebApiJs;
  private http = inject(HttpClient);

  constructor() {
    this.api = new SpotifyWebApi();
  }

  getAuthUrl() {
    const clientId = environment.spotify.clientId;
    const redirectUri = encodeURIComponent(environment.spotify.redirectUri);
    const scopes = environment.spotify.scopes.join('%20');

    return `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&scope=${scopes}`;
  }

  setAccessToken(token: string) {
    console.log(`this is your token ${token}`)
    this.api.setAccessToken(token);
  }

  getAccessToken() {
    this.api.getAccessToken();
  }

  async getCurrentUser() {
    return await this.api.getMe();
  }

  isLoggedIn() {
    const token = localStorage.getItem('access-token');
    return token !== null;
  }

  async createPlaylist(userId: string, name: string, description: string) {
    return await this.api.createPlaylist(userId, {
      name: name,
      description: description,
      public: false,
    } as CreatePlaylistRequest);
  }

  getPlaylists(): any {
    return from(this.api.getUserPlaylists());
  }

  getTracks(playlistId: string): any {
    return from(this.api.getPlaylistTracks(playlistId))
  }

  searchTracks(query: string): any {
    return from(this.api.searchTracks(query));
  }
}
