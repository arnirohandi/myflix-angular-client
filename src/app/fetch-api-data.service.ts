import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

// Declaring the API URL that will provide data for the client app
const apiUrl = 'https://myflix-api-app-ff32afce7dc8.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {

  constructor(private http: HttpClient) { }

  /**
   * User Registration
   * @param userDetails - Object containing user information
   * @returns Observable with server response
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log('User Details:', userDetails);
    return this.http.post(`${apiUrl}users`, userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Update user info
   * @param username - The username of the user to update
   * @param userDetails - Object containing updated user information
   * @returns Observable with server response
   */
  public updateUser(username: string, userDetails: any): Observable<any> {
    return this.http.put(`${apiUrl}users/${encodeURIComponent(username)}`, userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Get all users
   * @returns Observable containing the list of users
   */
  public getAllUsers(): Observable<any> {
    return this.http.get(`${apiUrl}users`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * User Login
   * @param loginData - Object containing username and password
   * @returns Observable with server response
   */
  public userLogin(loginData: any): Observable<any> {
    return this.http.post(`${apiUrl}login`, loginData).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Deregister a user
   * @param username - The username of the user to be deleted
   * @returns Observable with server response
   */
  public deleteUser(username: string): Observable<any> {
    return this.http.delete(`${apiUrl}users/${encodeURIComponent(username)}`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Get all movies
   * @returns Observable containing the list of movies
   */
  public getAllMovies(): Observable<any> {
    return this.http.get(`${apiUrl}movies`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Get movie details by title
   * @param title - The title of the movie
   * @returns Observable containing movie details
   */
  public getMovieByTitle(title: string): Observable<any> {
    return this.http.get(`${apiUrl}movies/title/${encodeURIComponent(title)}`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Get movies by genre
   * @param name - The name of the genre
   * @returns Observable containing movies of the specified genre
   */
  public getMoviesByGenre(name: string): Observable<any> {
    return this.http.get(`${apiUrl}movies/genres/${encodeURIComponent(name)}`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Get director details by name
   * @param name - The name of the director
   * @returns Observable containing director details
   */
  public getDirectorByName(name: string): Observable<any> {
    return this.http.get(`${apiUrl}directors/${encodeURIComponent(name)}`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Add a movie to user's favorites
   * @param username - The username of the user
   * @param movieId - The ID of the movie to add
   * @returns Observable with server response
   */
  public addMovieToFavorites(username: string, movieId: string): Observable<any> {
    return this.http.post(`${apiUrl}users/${encodeURIComponent(username)}/movie/${encodeURIComponent(movieId)}`, null).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Remove a movie from user's favorites
   * @param username - The username of the user
   * @param movieId - The ID of the movie to remove
   * @returns Observable with server response
   */
  public removeMovieFromFavorites(username: string, movieId: string): Observable<any> {
    return this.http.delete(`${apiUrl}users/${encodeURIComponent(username)}/movie/${encodeURIComponent(movieId)}`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Handle HTTP Errors
   * @param error - HttpErrorResponse object
   * @returns Observable throwing an error message
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      console.error('An error occurred:', error.error.message);
    } else {
      // Backend returned an unsuccessful response code
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
