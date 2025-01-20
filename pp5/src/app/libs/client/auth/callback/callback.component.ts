import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpotifyService } from '../../../../core/services/spotify.service';

@Component({
  selector: 'app-callback',
  standalone: true,
  imports: [],
  templateUrl: './callback.component.html',
  styleUrl: './callback.component.scss',
})
export class CallbackComponent implements OnInit {
  private router = inject(Router);
  private spotifyService = inject(SpotifyService);

  ngOnInit() {
    const hash = window.location.hash;
    const token = this.extractTokenFromHash(hash);
    if (token) {
      this.spotifyService.setAccessToken(token);
      localStorage.setItem('access-token', token);
      console.log(token);
      this.router.navigateByUrl('/home');
    } else {
      this.router.navigate(['/login']);
    }
  }

  private extractTokenFromHash(hash: string): string | null {
    const params = new URLSearchParams(hash.replace('#', ''));
    console.log(params.get('access_token'));
    return params.get('access_token');
  }
}
