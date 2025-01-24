import { Component, NgModule, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { SpotifyService } from '../../../core/services/spotify.service';
import { PlaylistStore } from '../playlist.store';
import { Playlist, Track } from '../../../core/services/models/models';
import { FormsModule } from '@angular/forms';
import { DisplayTracksComponent } from "../playlist/display-tracks/display-tracks.component";
import { PlaylistCreateComponent } from "../playlist/playlist-create/playlist-create.component";
import { PlaylistRemoveComponent } from "../playlist/playlist-remove/playlist-remove.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, FormsModule, DisplayTracksComponent, PlaylistCreateComponent, PlaylistRemoveComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [PlaylistStore],
})
export class HomeComponent {
  userLoggedIn = signal<boolean>(false);
  private spotifyService = inject(SpotifyService);
  private playlistStore = inject(PlaylistStore);
  userPlaylists = computed(() => this.playlistStore.playlists());
  confirmingRemove: Playlist | null = null;
  isAddingPlaylist = false; 
  selectedPlaylist: Playlist | null = null;

  constructor() {
    this.userLoggedIn.set(this.spotifyService.isLoggedIn());
    this.playlistStore.fetchPlaylists();
  }

  login(): void {
    const authUrl = this.spotifyService.getAuthUrl();
    window.location.href = authUrl;
  }

  logout(): void {
    this.userLoggedIn.set(false);
    this.playlistStore.setPlaylists([]);
  }

  showAddPlaylistForm(): void {
    this.isAddingPlaylist = true; 
  }
  
  cancelAddPlaylist(): void {
    this.isAddingPlaylist = false; 
  }

  addPlaylist(newPlaylist: Playlist): void {
    this.playlistStore.addPlaylist(newPlaylist);
    this.cancelAddPlaylist();
  }

  modifyPlaylist(playlist: any): void {
    const newName = window.prompt('Enter a new name for the playlist:', playlist.name);
    if (newName && newName.trim()) {
      const updatedPlaylist = { ...playlist, name: newName.trim() };
      this.playlistStore.modifyPlaylist(updatedPlaylist);
    }
  }

  askRemoveConfirmation(playlist: Playlist): void {
    this.confirmingRemove = playlist;
  }

  cancelRemove(): void {
    this.confirmingRemove = null;
  }

  removePlaylist(): void {
    if (this.confirmingRemove) {
      this.playlistStore.removePlaylist(this.confirmingRemove.id);
      this.confirmingRemove = null;
    }
  }

  viewTracklist(playlist: Playlist): void {
    this.selectedPlaylist = playlist;
  }

  goBackToPlaylists(): void {
    this.selectedPlaylist = null;
    window.scrollTo(0, 0);
  }
}
