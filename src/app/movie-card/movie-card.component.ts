import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MovieDialogComponent } from '../movie-dialog/movie-dialog.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgForOf } from '@angular/common';
import { Observable } from 'rxjs';

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
  movies: any[] = [];
  username: string = '';

  constructor(
    public fetchApiData: FetchApiDataService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getMovies();
    this.getUsername();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
    });
  }

  getUsername(): void {
    this.username = JSON.parse(<string>localStorage.getItem('user')).Username || '';
  }

  goToProfileView(): void {
    this.router.navigate(['/profile']);
  }

  openGenreDialog(movie: any): void {
    this.dialog.open(MovieDialogComponent, {
      data: {
        type: 'genre',
        title: movie.genre.name,
        content: movie.genre.description
      }
    });
  }

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
