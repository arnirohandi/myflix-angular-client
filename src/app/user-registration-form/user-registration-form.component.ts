import {Component, OnInit, Input} from '@angular/core';

// You'll use this import to close the dialog on success
import {MatDialogRef} from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import {FetchApiDataService} from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatCardModule} from '@angular/material/card';
import {FormsModule} from '@angular/forms';
import {MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';

@Component({
  selector: 'app-user-registration-form',
  imports: [MatCardModule, FormsModule, MatFormField, MatInput],
  templateUrl: './user-registration-form.component.html',
  styleUrl: './user-registration-form.component.scss'
})
export class UserRegistrationFormComponent implements OnInit {
  @Input() userData = {Username: '', Password: '', Email: '', Birthday: ''};

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  // This is the function responsible for sending the form inputs to the backend
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe({
      next: (result) => {
        console.log(result);
        this.dialogRef.close(); // This will close the modal on success!
        this.snackBar.open(result.Username + 'successfully registered', 'OK', { duration: 2000 });
      },
      error: (error) => {
        this.snackBar.open(error, 'OK', { duration: 2000 });
      }
    });
  }

}
