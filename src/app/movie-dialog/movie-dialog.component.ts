/**
 * @fileoverview MovieDialogComponent displays a movie details dialog.
 * It allows users to view movie information and close the dialog.
 */

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
  /**
   * Creates an instance of MovieDialogComponent.
   * @param {MatDialogRef<MovieDialogComponent>} dialogRef - Reference to the opened dialog.
   * @param {any} data - Movie data passed to the dialog.
   */
  constructor(
    public dialogRef: MatDialogRef<MovieDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  /**
   * Closes the dialog.
   */
  closeDialog(): void {
    this.dialogRef.close();
  }
}
