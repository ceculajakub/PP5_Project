import { inject, NgModule } from '@angular/core';
import { RedirectCommand, Router, RouterModule, Routes } from '@angular/router';
import { AuthService } from './core/services/auth.service';
const OnlyIfLoggedIn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if (authService.getToken()) return true;

  const loginPath = router.parseUrl('/login');
  return new RedirectCommand(loginPath, {
    skipLocationChange: true,
  });
};
const routes: Routes = [{
  path: '',
  redirectTo: 'music',
  pathMatch: 'full',
},
{
  canActivate: [OnlyIfLoggedIn],
  path: 'playlists',
  loadChildren: () =>
    import('./playlists/playlists.module').then((m) => m.PlaylistsModule),
},
{
  path: 'music',
  // loadChildren: () => import('./music/music.module').then(m => m.MusicModule) },
  // loadChildren: () => import('./music/music-routing.module').then(m => m.routes) },
  // loadChildren: () => import('./music/music-routing.module').then(m => m.default) },
  loadChildren: () => import('./music/music-routing.module'),
},
{
  path: '**',
  redirectTo: 'music',
  pathMatch: 'full',
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
