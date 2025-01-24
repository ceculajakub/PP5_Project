import { Component, NgModule, OnInit, computed, inject, signal } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { SpotifyService } from '../../../core/services/spotify.service';
import { PlaylistStore } from '../playlist.store';
import { Playlist, Track } from '../../../core/services/models/models';
import { FormsModule } from '@angular/forms';
import { DisplayTracksComponent } from "../playlist/display-tracks/display-tracks.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, FormsModule, DisplayTracksComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [PlaylistStore],
})
export class HomeComponent {
  userLoggedIn = signal<boolean>(false);
  private spotifyService = inject(SpotifyService);
  private playlistStore = inject(PlaylistStore);
  userPlaylists = computed(() => this.playlistStore.playlists());
  confirmingRemove: string | null = null;
  isAddingPlaylist = false; 
  newPlaylistTitle = ''; 
  newPlaylistDescription = '';
  selectedPlaylist: Playlist | null = null;

  constructor()
  {
    this.userLoggedIn.set(this.spotifyService.isLoggedIn());

      this.playlistStore.fetchPlaylists();
  }

  // ngOnInit(): void {
  //   this.userLoggedIn.set(this.spotifyService.isLoggedIn());

  //   if (this.userLoggedIn()) {
  //     this.playlistStore.fetchPlaylists();
  //   }
  // }

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
    this.newPlaylistTitle = ''; 
    this.newPlaylistDescription = '';
  }

  addPlaylist(): void {
    if (this.newPlaylistTitle.trim() && this.newPlaylistDescription.trim()) {
      const newPlaylist: Playlist = {
        id: Date.now().toString(), 
        name: this.newPlaylistTitle.trim(),
        description: this.newPlaylistDescription.trim(),
        images: [
          {
            url: 'https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjExMjQtMDQta3kzc2s5bXUuanBn.jpg',
          },
        ],
        owner: {
          display_name: 'You',
        },
        tracks: {
          total: 0,
          href: '',
        },
        external_urls: {
          spotify: '',
        },
      };
      this.playlistStore.addPlaylist(newPlaylist);
      this.cancelAddPlaylist();
    }
  }

  modifyPlaylist(playlist: any): void {
    const newName = window.prompt('Enter a new name for the playlist:', playlist.name);
    if (newName && newName.trim()) {
      const updatedPlaylist = { ...playlist, name: newName.trim() };
      this.playlistStore.modifyPlaylist(updatedPlaylist);
    }
  }

  askRemoveConfirmation(playlist: any): void {
    this.confirmingRemove = playlist.id;
  }

  cancelRemove(): void {
    this.confirmingRemove = null;
  }

  removePlaylist(playlist: any): void {
    this.playlistStore.removePlaylist(playlist.id);
    this.confirmingRemove = null;
  }

  viewTracklist(playlist: Playlist): void {
    this.selectedPlaylist = playlist;
  }

  goBackToPlaylists(): void {
    this.selectedPlaylist = null;
    window.scrollTo(0, 0)
  }

}
