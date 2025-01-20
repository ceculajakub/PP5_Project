import { Component, inject } from '@angular/core';
import { SpotifyService } from '../../../../core/services/spotify.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private spotifyService = inject(SpotifyService);

  login() {
    const authUrl = this.spotifyService.getAuthUrl();
    window.location.href = authUrl;
  }
}
