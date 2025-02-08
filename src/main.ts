/**
 * @fileoverview Entry point for the Angular application.
 * This file bootstraps the application using Angular's `bootstrapApplication` method.
 */

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

/**
 * Bootstraps the Angular application.
 *
 * @function
 * @name bootstrapApplication
 * @param {typeof AppComponent} AppComponent - The root component of the application.
 * @param {object} appConfig - Configuration object for the application.
 * @returns {Promise<void>} A promise that resolves when the application is successfully bootstrapped,
 *                          or rejects with an error if bootstrapping fails.
 */
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err)); // Logs any bootstrapping errors to the console.
