import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Playlist } from '../../../../core/services/models/models';

@Component({
  selector: 'app-playlist-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './playlist-create.component.html',
  styleUrls: ['./playlist-create.component.scss']
})
export class PlaylistCreateComponent {
  @Output() addPlaylist = new EventEmitter<Playlist>();
  @Output() cancel = new EventEmitter<void>();

  newPlaylistTitle = '';
  newPlaylistDescription = '';

  submitForm(): void {
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
      this.addPlaylist.emit(newPlaylist);
      this.newPlaylistTitle = '';
      this.newPlaylistDescription = '';
    }
  }

  cancelForm(): void {
    this.cancel.emit();
  }
}
