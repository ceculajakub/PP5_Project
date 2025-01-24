import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-playlist-remove',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './playlist-remove.component.html',
  styleUrls: ['./playlist-remove.component.scss']
})
export class PlaylistRemoveComponent {
  @Input() playlistName: string = '';
  @Output() confirmRemove = new EventEmitter<void>();
  @Output() cancelRemove = new EventEmitter<void>();

  confirm() {
    this.confirmRemove.emit();
  }

  cancel() {
    this.cancelRemove.emit();
  }
}
