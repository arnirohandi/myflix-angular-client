/**
 * @fileoverview Defines the application's routing configuration.
 * This includes routes for the welcome page, movies list, and user profile.
 */

import { Routes } from '@angular/router';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';

/**
 * Application routes configuration.
 * Defines paths for different components and sets up default redirection.
 */
export const routes: Routes = [
  /**
   * Route for the welcome page.
   * Path: `/welcome`
   * Component: `WelcomePageComponent`
   */
  { path: 'welcome', component: WelcomePageComponent },

  /**
   * Route for the movies list page.
   * Path: `/movies`
   * Component: `MovieCardComponent`
   */
  { path: 'movies', component: MovieCardComponent },

  /**
   * Route for the user profile page.
   * Path: `/profile`
   * Component: `ProfileViewComponent`
   */
  { path: 'profile', component: ProfileViewComponent },

  /**
   * Default route redirection.
   * Redirects empty path (`/`) to `/welcome` with `pathMatch: 'prefix'`.
   */
  { path: '', redirectTo: 'welcome', pathMatch: 'prefix' }
];
