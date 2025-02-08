/**
 * @fileoverview Main component of the myFlix Angular application.
 * Handles navigation and user authentication dialogs.
 */

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  /** Application title displayed in the browser tab. */
  title = 'myFlix-Angular-client';

  /**
   * Creates an instance of AppComponent.
   * @param {MatDialog} dialog - Service to open material dialogs.
   */
  constructor(public dialog: MatDialog) {}

  /**
   * Opens the user registration dialog.
   * Triggered when the signup button is clicked.
   */
  protected openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px' // Sets the dialog width
    });
  }

  /**
   * Opens the user login dialog.
   * Triggered when the login button is clicked.
   */
  protected openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '280px' // Sets the dialog width
    });
  }
}
