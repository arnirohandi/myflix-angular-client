import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-movie-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './movie-dialog.component.html',
  styleUrl: './movie-dialog.component.scss',
})
export class MovieDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<MovieDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
