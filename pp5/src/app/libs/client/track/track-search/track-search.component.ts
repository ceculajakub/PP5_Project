import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SpotifyService } from '../../../../core/services/spotify.service';
import { Track } from '../../../../core/services/models/models';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-track-search',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './track-search.component.html',
  styleUrls: ['./track-search.component.scss'],
})
export class TrackSearchComponent {
  private spotifyService = inject(SpotifyService);
  searchQuery: string = '';
  searchResults = signal<Track[]>([]);
  @Output() results = new EventEmitter<Track[]>();
  private searchSubject = new Subject<string>();

  constructor() {
    this.searchSubject
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((query) => this.spotifyService.searchTracks(query))
      )
      .subscribe((response: any) => {
        this.searchResults.set(response.tracks.items);
        this.results.emit(response.tracks.items);
      });
  }

  onSearchQueryChange() {
    if (this.searchQuery.length >= 1) {
      this.searchSubject.next(this.searchQuery);
    }
    if (this.searchQuery.length === 0) {
      this.searchResults.set([]);
      this.results.emit([]);
    }
  }
}
