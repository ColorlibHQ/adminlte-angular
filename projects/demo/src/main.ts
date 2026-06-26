import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideZoneChangeDetection, type ApplicationConfig } from '@angular/core';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: 'enabled' })),
  ],
};

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
