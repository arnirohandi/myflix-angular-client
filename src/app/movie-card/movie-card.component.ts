/**
 * @fileoverview MovieCardComponent displays a list of movies.
 * Users can view movie details, genres, and directors in dialog popups, navigate to their profile,
 * and add movies to their favorites.
 */

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MovieDialogComponent } from '../movie-dialog/movie-dialog.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    NgForOf,
  ],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
})
export class MovieCardComponent implements OnInit {
  /**
   * List of movies fetched from the API.
   */
  movies: any[] = [];

  /**
   * Stores the logged-in user's username.
   */
  username: string = '';

  /**
   * Creates an instance of MovieCardComponent.
   * @param {FetchApiDataService} fetchApiData - Service for fetching movie data from the API.
   * @param {Router} router - Service for handling route navigation.
   * @param {MatDialog} dialog - Service for opening material dialogs.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  /**
   * Lifecycle hook that is called after component initialization.
   * Fetches movies and retrieves the username of the logged-in user.
   */
  ngOnInit(): void {
    this.getMovies();
    this.getUsername();
  }

  /**
   * Fetches the list of movies from the API and stores them in `movies`.
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
    });
  }

  /**
   * Retrieves the logged-in user's username from local storage.
   */
  getUsername(): void {
    this.username = JSON.parse(<string>localStorage.getItem('user')).Username || '';
  }

  /**
   * Navigates to the profile view page.
   */
  goToProfileView(): void {
    this.router.navigate(['/profile']);
  }

  /**
   * Opens a dialog displaying the genre details of a movie.
   * @param {any} movie - The selected movie object.
   */
  openGenreDialog(movie: any): void {
    this.dialog.open(MovieDialogComponent, {
      data: {
        type: 'genre',
        title: movie.genre.name,
        content: movie.genre.description
      }
    });
  }

  /**
   * Opens a dialog displaying the director's details of a movie.
   * @param {any} movie - The selected movie object.
   */
  openDirectorDialog(movie: any): void {
    this.dialog.open(MovieDialogComponent, {
      data: {
        type: 'director',
        title: movie.director.name,
        content: movie.director.bio,
        birth_date: movie.director.birth_date,
        death_year: movie.director.death_year
      }
    });
  }

  /**
   * Opens a dialog displaying movie details.
   * @param {any} movie - The selected movie object.
   */
  openMovieDetailsDialog(movie: any): void {
    this.dialog.open(MovieDialogComponent, {
      data: {
        type: 'movie',
        title: movie.title,
        content: movie.description,
        image_url: movie.image_url
      }
    });
  }

  /**
   * Adds a movie to the user's list of favorite movies.
   * If the user is not logged in, an alert is shown.
   * @param {any} movie - The selected movie object.
   */
  addToFavorites(movie: any): void {
    if (!this.username) {
      alert('Please log in first.');
      return;
    }

    this.fetchApiData.addMovieToFavorites(this.username, movie._id).subscribe(
      () => {
        alert(`${movie.title} has been added to your favorites!`);
      },
      (error) => {
        console.error('Error adding movie to favorites:', error);
        alert('Could not add movie to favorites. Please try again later.');
      }
    );
  }
}
