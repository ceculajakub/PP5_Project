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
    return !!token;
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
    // console.log(this.http.get(`https://api.spotify.com/v1/playlists/`, {
    //   headers: {
    //     Authorization: `Bearer ${this.getAccessToken()}`,
    //   },
    // }));
    // return this.api.getUserPlaylists()
    //   .then(data => {
    //     console.log('Raw Playlist Response:', JSON.stringify(data, null, 2));
    //     return data
    //   })
    //   .catch(error => {
    //     if (error.response) {
    //       // If using axios or similar tools, inspect raw response
    //       console.error('Raw Error Response:', error.response);
    //     }
    //     console.error('Error Details:', error);
    //   });
  }
}
