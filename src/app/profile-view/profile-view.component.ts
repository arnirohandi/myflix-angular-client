/**
 * @fileoverview ProfileViewComponent displays and updates the user's profile.
 * It retrieves user data from local storage, initializes a form for editing, and processes profile updates.
 */

import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-profile-view',
  standalone: true,
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class ProfileViewComponent implements OnInit {
  /**
   * Reactive form group for user profile.
   */
  profileForm!: FormGroup;

  /**
   * FormBuilder instance for handling form controls.
   */
  private fb = inject(FormBuilder);

  /**
   * Stores the user's username.
   */
  private user: any = {};

  /**
   * Stores the user's email.
   */
  private email: any = {};

  /**
   * Lifecycle hook that is called after component initialization.
   * Loads the user profile and initializes the form.
   */
  ngOnInit(): void {
    this.loadUserProfile();
    this.initializeForm();
  }

  /**
   * Loads the user profile from local storage.
   * Parses and extracts the username and email for form pre-filling.
   */
  loadUserProfile(): void {
    const userData = localStorage.getItem('user');
    console.log(userData);
    if (userData) {
      const parsedData = JSON.parse(userData);
      this.user = parsedData.Username;
      this.email = parsedData.Email;
    }
  }

  /**
   * Initializes the reactive form with user data.
   * Uses stored username and email as default values.
   */
  initializeForm(): void {
    this.profileForm = this.fb.group({
      username: [this.user || ''],
      email: [this.email || '']
    });
  }

  /**
   * Handles user profile updates.
   * Retrieves form values and prepares data for submission (currently incomplete).
   */
  updateProfile(): void {
    const updatedUser = this.profileForm.value;
    // Logic for updating user profile should be implemented here
  }
}
