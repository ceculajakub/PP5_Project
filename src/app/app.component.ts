import { Component, inject } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NavigationComponent } from './core/layout/navigation/navigation.component';
import { AuthService } from './core/services/auth.service';
import { SharedModule } from './shared/shared.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: [
    NavigationComponent,
    SharedModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    MatSnackBarModule
  ]
})
export class AppComponent {
  title = 'pp5';
  auth = inject(AuthService);


  login() {
    this.auth.login();
  }

  ngOnInit(): void {
    this.auth.checkLogin();
  }
}
