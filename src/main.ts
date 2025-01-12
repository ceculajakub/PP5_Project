
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { bootstrapApplication, provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AppComponent } from './app/app.component';
import { API_CONFIG } from './app/core/tokens';
import { environment } from './environments/environment';

bootstrapApplication(AppComponent, {
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    // provideRouter(routes, )
    provideHttpClient(
      withInterceptorsFromDi(),
      withFetch()
    ),
    {
      provide: API_CONFIG,
      useValue: {api_url: environment.api_url}
    }
  ]
})
