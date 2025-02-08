/**
 * @fileoverview UserRegistrationFormComponent handles user registration.
 * It collects user input, submits it to the API, and provides feedback via a snackbar.
 */

import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-user-registration-form',
  imports: [MatCardModule, FormsModule, MatFormField, MatInput, MatButton],
  templateUrl: './user-registration-form.component.html',
  styleUrl: './user-registration-form.component.scss'
})
export class UserRegistrationFormComponent implements OnInit {
  /**
   * Stores user input for registration.
   * @property {object} userData
   * @property {string} userData.Username - The username entered by the user.
   * @property {string} userData.Password - The password entered by the user.
   * @property {string} userData.Email - The email address entered by the user.
   * @property {string} userData.Birthday - The birthday entered by the user.
   */
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  /**
   * Creates an instance of UserRegistrationFormComponent.
   * @param {FetchApiDataService} fetchApiData - Service for making API requests.
   * @param {MatDialogRef<UserRegistrationFormComponent>} dialogRef - Reference to the dialog box.
   * @param {MatSnackBar} snackBar - Service for displaying notifications.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  /**
   * Lifecycle hook that is called after component initialization.
   */
  ngOnInit(): void {}

  /**
   * Registers a new user by sending the form data to the backend.
   * Closes the dialog and displays a success message if registration is successful,
   * otherwise displays an error message.
   */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe({
      next: (result) => {
        console.log(result);
        this.dialogRef.close(); // Closes the modal on success
        this.snackBar.open(result.Username + ' successfully registered', 'OK', { duration: 2000 });
      },
      error: (error) => {
        this.snackBar.open(error, 'OK', { duration: 2000 });
      }
    });
  }
}
