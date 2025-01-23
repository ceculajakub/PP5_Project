import { Component, computed, inject, Input, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { Playlist, Track } from '../../../../core/services/models/models';
import { HttpClient } from '@angular/common/http';
import { PlaylistStore } from '../../home/playlist.store';

@Component({
  selector: 'app-display-tracks',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './display-tracks.component.html',
  styleUrl: './display-tracks.component.scss'
})
export class DisplayTracksComponent implements OnInit {
  @Input() playlist!: Playlist;
  tracklist: Track[] = [];
  private playlistStore = inject(PlaylistStore);
  playlistTracks = computed(() => this.playlistStore.tracks())


  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.playlistStore.fetchTracks(this.playlist.id);
  }

  getArtistsNames(track: Track): string {
    return track.artists.map(artist => artist.name).join(', ');
  }
}
