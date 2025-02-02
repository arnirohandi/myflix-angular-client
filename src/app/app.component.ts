import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {UserLoginFormComponent} from './user-login-form/user-login-form.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatButton],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'myFlix-Angular-client';

  constructor(public dialog: MatDialog) { }

  protected openUserRegistrationDialog(): void {
    // This is the function that will open the dialog when the signup button is clicked
    this.dialog.open(UserRegistrationFormComponent, {
      // Assigning the dialog a width
      width: '280px'
    });
  }

  protected openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '280px'
    });
  }
}
