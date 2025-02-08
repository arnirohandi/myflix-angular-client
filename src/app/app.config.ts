/**
 * @fileoverview Defines the application's global configuration.
 * This includes providers for routing, HTTP client, animations, and material icons.
 */

import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatIconModule } from '@angular/material/icon';

/**
 * Application configuration object.
 * Provides essential services such as routing, HTTP client, animations, and Material icons.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    /**
     * Enables optimized zone change detection.
     * - `eventCoalescing: true` improves performance by batching multiple events.
     */
    provideZoneChangeDetection({ eventCoalescing: true }),

    /**
     * Configures the application's routing.
     * Uses the predefined routes from `app.routes.ts`.
     */
    provideRouter(routes),

    /**
     * Provides the HttpClient module for making HTTP requests.
     */
    provideHttpClient(),

    /**
     * Enables Angular animations.
     */
    provideAnimations(),

    /**
     * Provides async animations support.
     */
    provideAnimationsAsync(),

    /**
     * Provides Material Icon module for displaying icons.
     */
    MatIconModule,

    /**
     * Additional async animations provider (redundant duplicate).
     */
    provideAnimationsAsync()
  ]
};
