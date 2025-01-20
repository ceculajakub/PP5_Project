import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { NgFor } from '@angular/common';
import { SpotifyService } from '../../../core/services/spotify.service';
import { PlaylistStore } from './playlist.store';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [PlaylistStore],
})
export class HomeComponent implements OnInit {
  userLoggedIn = signal<boolean>(false);
  private spotifyService = inject(SpotifyService);
  private playlistStore = inject(PlaylistStore);
  userPlaylists = computed(() => this.playlistStore.playlists());
  ngOnInit(): void {
    this.userLoggedIn.set(this.spotifyService.isLoggedIn());

    if (this.userLoggedIn()) {
      this.playlistStore.fetchPlaylists();
    }
  }

  login(): void {
    const authUrl = this.spotifyService.getAuthUrl();
    window.location.href = authUrl;
  }

  logout(): void {
    this.userLoggedIn.set(false);
    this.playlistStore.setPlaylists([]);
  }

  addPlaylist(): void {
    // Logic to add a playlist
  }

  modifyPlaylist(playlist: any): void {
    this.playlistStore.modifyPlaylist(playlist);
  }

  removePlaylist(playlist: any): void {
    this.playlistStore.removePlaylist(playlist.id);
  }
}
