import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

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
  profileForm!: FormGroup;
  private fb = inject(FormBuilder);
  private user: any = {}
  private email: any = {}

  ngOnInit(): void {
    this.loadUserProfile();
    this.initializeForm();
  }

  loadUserProfile() {
    const userData = localStorage.getItem('user');
    console.log(userData);
    if (userData) {
      this.user = JSON.parse(userData).Username;
      this.email = JSON.parse(userData).Email;
    }
  }

  initializeForm(): void {
    this.profileForm = this.fb.group({
      username: [this.user || ''],
      email: [this.email || '']
    });
  }

  updateProfile() {
    const updatedUser = this.profileForm.value;
  }

}
