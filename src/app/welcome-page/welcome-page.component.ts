import {Component} from '@angular/core';
import {UserLoginFormComponent} from '../user-login-form/user-login-form.component';
import {UserRegistrationFormComponent} from '../user-registration-form/user-registration-form.component';
import {MatDialog} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {MovieCardComponent} from '../movie-card/movie-card.component';

@Component({
  selector: 'app-welcome-page',
  imports: [
    MatButton
  ],
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.scss'
})
export class WelcomePageComponent {
  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px'
    });
  }

  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '280px'
    });
  }

  openMoviesDialog(): void {
    this.dialog.open(MovieCardComponent, {
      width: '1000px',
      maxWidth: 'none'
    });
  }
}
