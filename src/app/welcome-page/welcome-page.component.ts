/**
 * @fileoverview WelcomePageComponent serves as the entry point for users.
 * It provides options to log in or register for an account.
 */

import { Component } from '@angular/core';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-welcome-page',
  imports: [
    MatButton
  ],
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.scss'
})
export class WelcomePageComponent {
  /**
   * Creates an instance of WelcomePageComponent.
   * @param {MatDialog} dialog - Service to open material dialogs.
   */
  constructor(public dialog: MatDialog) {}

  /**
   * Opens the user registration dialog.
   * Triggered when the "Sign Up" button is clicked.
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px' // Sets the dialog width
    });
  }

  /**
   * Opens the user login dialog.
   * Triggered when the "Log In" button is clicked.
   */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '280px' // Sets the dialog width
    });
  }
}
