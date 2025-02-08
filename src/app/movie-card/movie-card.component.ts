import {Component} from '@angular/core';
import {FetchApiDataService} from '../fetch-api-data.service'
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';
import {NgForOf} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-movie-card',
  imports: [
    MatCard,
    MatCardTitle,
    MatCardSubtitle,
    NgForOf,
    MatIcon,
    MatCardActions,
    MatCardHeader,
    MatButton,
    MatCardContent
  ],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss'
})
export class MovieCardComponent {
  movies: any[] = [];

  constructor(public fetchApiData: FetchApiDataService) {
  }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }
}
