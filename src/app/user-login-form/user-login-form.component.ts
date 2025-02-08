/**
 * @fileoverview UserLoginFormComponent handles user authentication.
 * It collects login credentials, submits them to the API, and manages session storage upon successful authentication.
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
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  imports: [MatCardModule, FormsModule, MatFormField, MatInput, MatButton],
  templateUrl: './user-login-form.component.html',
  styleUrl: './user-login-form.component.scss'
})
export class UserLoginFormComponent implements OnInit {
  /**
   * Stores user input for login.
   * @property {object} loginData
   * @property {string} loginData.Username - The username entered by the user.
   * @property {string} loginData.Password - The password entered by the user.
   */
  @Input() loginData = { Username: '', Password: '' };

  /**
   * Creates an instance of UserLoginFormComponent.
   * @param {FetchApiDataService} fetchApiData - Service for making API requests.
   * @param {MatDialogRef<UserLoginFormComponent>} dialogRef - Reference to the dialog box.
   * @param {MatSnackBar} snackBar - Service for displaying notifications.
   * @param {Router} router - Service for navigating between routes.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  /**
   * Lifecycle hook that is called after component initialization.
   */
  ngOnInit(): void {}

  /**
   * Authenticates the user by sending login credentials to the backend.
   * On success, stores user information in local storage, navigates to the movies page,
   * and closes the login dialog.
   * Displays an error message if authentication fails.
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.loginData).subscribe({
      next: (result) => {
        console.log(result);
        localStorage.setItem('user', JSON.stringify(result.user)); // Store user data in local storage
        localStorage.setItem('token', result.token); // Store authentication token
        this.dialogRef.close(); // Close login dialog on success
        this.snackBar.open('Login successful', 'OK', { duration: 2000 });
        this.router.navigate(['movies']); // Navigate to movies page
      },
      error: (error) => {
        this.snackBar.open(error, 'OK', { duration: 2000 });
      }
    });
  }
}
